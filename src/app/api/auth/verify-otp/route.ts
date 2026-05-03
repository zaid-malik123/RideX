import { connectDb } from "@/lib/db";
import { NextRequest } from "next/server";
import { handleError } from "@/lib/handleError";
import { ApiResponse } from "@/lib/ApiResponse";
import { ApiError } from "@/lib/ApiError";
import userModel from "@/models/user.model";

export async function Post(req: NextRequest) {
  await connectDb();

  try {

    const { email, otp } = await req.json();

    if(!otp || !email) {
        throw new ApiError("OTP is required ", 400)
    }

    const user = await userModel.findOne({
        email
    })

    if(!user) {
        throw new ApiError("User not found", 400)
    }

    if(user.isVerifiedEmail) {
        throw new ApiError("User is already verified please login", 400)
    }

    if(!user.otpExpiresAt || user.otpExpiresAt < new Date()) {
        throw new ApiError("Your Otp has been expired", 400)
    }

    const isEqual = user.otp === otp;

    if(!isEqual) {
        throw new ApiError("OTP is not equal", 400)
    }

    user.isVerifiedEmail = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    return ApiResponse({
      success: true,
      message: "Email verified successfully",   
    })

  } catch (error) {
    console.log("verify-otp api error", error);
    return handleError(error);
  }
}
