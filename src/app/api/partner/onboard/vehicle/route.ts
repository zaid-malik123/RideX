import { auth } from "@/auth";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { connectDb } from "@/lib/db";
import { handleError } from "@/lib/handleError";
import userModel from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";
import { NextRequest } from "next/server";

const VEHICLE_NUMBER_REGEX =
  /^[A-Z]{2}[ -]?\d{1,2}[ -]?[A-Z]{1,3}[ -]?\d{4}$/i;

export async function POST(req: NextRequest) {
  await connectDb();

  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new ApiError("User is not Authenticated", 401);
    }

    const user = await userModel.findById(session.user.id);

    if (!user) {
      throw new ApiError("User is not found", 404);
    }

    // renamed variable to avoid conflict
    const { type, number, vehicleModel: modelName } = await req.json();

    if (!type || !number || !modelName) {
      throw new ApiError("All fields are required", 400);
    }

    if (!VEHICLE_NUMBER_REGEX.test(number)) {
      throw new ApiError("Invalid Vehicle Number", 400);
    }

    const vehicleNumber = number.toUpperCase();

    // duplicate check
    const duplicate = await Vehicle.findOne({
      number: vehicleNumber,
      owner: { $ne: user._id }, // dusre user ka same number na ho
    });

    if (duplicate) {
      throw new ApiError("Duplicate Vehicle Number", 400);
    }

    // existing vehicle
    let vehicle = await Vehicle.findOne({
      owner: user._id,
    });

    // update
    if (vehicle) {
      vehicle.type = type;
      vehicle.number = vehicleNumber;
      vehicle.vehicleModel = modelName;

      await vehicle.save();

      return ApiResponse({
        success: true,
        message: "Vehicle Updated",
        data: vehicle,
      });
    }

    // create
    vehicle = await Vehicle.create({
      owner: user._id,
      type,
      number: vehicleNumber,
      vehicleModel: modelName,
    });

    if (user.partnerOnBoardingSteps < 1) {
      user.partnerOnBoardingSteps = 1;
    }

    user.role = "partner";

    await user.save();

    return ApiResponse({
      success: true,
      message: "Vehicle Created",
      data: vehicle,
      status: 201,
    });

  } catch (error) {
    console.log("partner/onboard/vehicle(post) api error", error);
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  await connectDb();

  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new ApiError("User is not Authenticated", 401);
    }

    const user = await userModel.findById(session.user.id);

    if (!user) {
      throw new ApiError("User is not found", 404);
    }

    const vehicle = await Vehicle.findOne({
      owner: user._id,
    });

    if (!vehicle) {
      throw new ApiError("Vehicle not found", 404);
    }

    return ApiResponse({
      success: true,
      message: "Vehicle found",
      data: vehicle,
    });

  } catch (error) {
    console.log("partner/onboard/vehicle(get) api error", error);
    return handleError(error);
  }
}