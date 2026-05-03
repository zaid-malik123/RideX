import { connectDb } from "@/lib/db";
import userModel from "@/models/user.model";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { handleError } from "@/lib/handleError";
import { ApiResponse } from "@/lib/ApiResponse";
import { ApiError } from "@/lib/ApiError";
import { generateOtp } from "@/utils/generateOtp";
import { sendOtpEmail } from "@/lib/mails/sendOtpMail";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      throw new ApiError("All fields are required", 400);
    }

    if (password.length < 6) {
      throw new ApiError("Password must be atleast 6 char", 400);
    }

    let user = await userModel.findOne({ email });

    if (user && user.isVerifiedEmail) {
      throw new ApiError("User already exists", 400);
    }

    const otp = generateOtp();
    const otpExp = new Date(Date.now() + 10 * 60 * 1000);
    const hash = await bcrypt.hash(password, 10);

    if (user && !user.isVerifiedEmail) {
      user.name = name;
      user.password = hash;
      user.otp = otp;
      user.otpExpiresAt = otpExp;

      await user.save();
    } else {
      user = await userModel.create({
        name,
        email,
        password: hash,
        otp,
        otpExpiresAt: otpExp,
      });
    }

    try {
      await sendOtpEmail(user.email, otp);
    } catch (err) {
      console.log("Email failed", err);
    }

    return ApiResponse({
      success: true,
      message: "OTP sent to email",
      data: user,
      status: 200,
    });

  } catch (error) {
    console.log("register api error", error);
    return handleError(error);
  }
}
