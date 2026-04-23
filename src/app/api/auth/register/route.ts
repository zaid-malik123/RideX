import { connectDb } from "@/lib/db";
import userModel from "@/models/user.model";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { handleError } from "@/lib/handleError";
import { ApiResponse } from "@/lib/ApiResponse";
import { ApiError } from "@/lib/ApiError";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { name, email, password } = await req.json();

    const user = await userModel.findOne({ email });

    if (user) {
      throw new ApiError("User already exists", 400);
    }

    if(password.length < 6) {
      throw new ApiError("Password must be atleast 6 char ", 400)
    }

    const hash = await bcrypt.hash(password, 10)

    const createdUser = await userModel.create({
        name,
        email,
        password: hash
    })

    return ApiResponse({
      success: true,
      message: "User created",
      data: createdUser,
      status: 201,
    });

  } catch (error) {
    console.log("register api error ", error)
    return handleError(error);
  }
}
