import { auth } from "@/auth";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { connectDb } from "@/lib/db";
import { handleError } from "@/lib/handleError";
import userModel from "@/models/user.model";
import { NextRequest } from "next/server";

const VEHICLE_NUMBER_REGEX = /^[A-Z]{2}[ -]?\d{1,2}[ -]?[A-Z]{1,3}[ -]?\d{4}$/i;

export async function POST(req: NextRequest) {
  connectDb();

  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new ApiError("User is not Authenticated ", 401);
    }

    const user = await userModel.findById(session.user.id);

    if (!user) {
      throw new ApiError("User is not found ", 401);
    }

    const { type, number, vehicleModel } = await req.json();

    if (!type || !number || !vehicleModel) {
      throw new ApiError("All fields are required", 401);
    }

    if (VEHICLE_NUMBER_REGEX.test(number)) {
      throw new ApiError("Invalid Vehicle Number", 401);
    }

    const vehicleNumber = number.toUpperCase();

    const duplicate = await vehicleModel.findOne({
        number: vehicleNumber
    })

    if(duplicate) {
       throw new ApiError("Duplicate Vehicle Number ", 401); 
    }

    let vehicle = await vehicleModel.findOne({
      owner: session.user.id,
    });

    if (vehicle) {
      vehicle.type = type;
      vehicle.number = vehicleNumber;
      vehicle.vehicleModel = vehicleModel;
      await vehicleModel.save();

      return ApiResponse({
        success: true,
        message: "Vehicle Updated",
        data: vehicle,
      });
    } else {
      vehicle = await vehicleModel.create({
        type,
        number: vehicleNumber,
        vehicleModel,
      });

      return ApiResponse({
        success: true,
        message: "Vehicle Created",
        data: vehicle,
        status: 201
      });
    }
  } catch (error) {
    console.log("user/me api error", error);
    return handleError(error);
  }
}
