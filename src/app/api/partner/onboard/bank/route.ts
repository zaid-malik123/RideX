import { auth } from "@/auth";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { connectDb } from "@/lib/db";
import { handleError } from "@/lib/handleError";
import PartnerBank from "@/models/partnerBank.model";
import userModel from "@/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDb();

  try {
    const session = await auth();

    if (!session || !session.user) {
      throw new ApiError("User is not Authenticated", 401);
    }

    const user = await userModel.findById(session.user.id);

    if (!user) {
      throw new ApiError("User is not found", 401);
    }

    const { accountHolder, accountNumber, ifsc, upi, mobileNumber } =
      await req.json();

    if (!accountHolder || !accountNumber || !ifsc || !mobileNumber) {
      throw new ApiError("Missing fields", 401);
    }

    const partnerBank = await PartnerBank.findOneAndUpdate(
      {
        owner: user._id,
      },
      {
        owner: user._id,
        accountHolder,
        accountNumber,
        ifsc,
        upi,
        status: "added",
      },
      {
        upsert: true,
        new: true,
      },
    );

    user.mobileNumber = mobileNumber;
    if (user.partnerOnBoardingSteps < 3) {
      user.partnerOnBoardingSteps = 3;
    }

    await user.save();

    return ApiResponse({
      success: true,
      message: "Bank Details Successfully Added",
      data: partnerBank,
    });
  } catch (error) {
    console.log("partner/onboard/bank(post) api error", error);
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
      throw new ApiError("User is not found", 401);
    }

    const bankDetails = PartnerBank.findOne({
      owner: user._id,
    });

    if(!bankDetails) {
        throw new ApiError("Bank details not found", 401)
    }

    return ApiResponse({
      success: true,
      message: "fetch Bank Details Successfully",
      data: bankDetails,
    });

  } catch (error) {
    console.log("partner/onboard/bank(get) api error", error);
    return handleError(error);
  }
}
