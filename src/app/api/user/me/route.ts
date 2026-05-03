import { connectDb } from "@/lib/db";
import { handleError } from "@/lib/handleError";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/ApiResponse";
import { ApiError } from "@/lib/ApiError";
import { auth } from "@/auth";
import userModel from "@/models/user.model";

export async function GET(req: NextRequest) {
  await connectDb();
  
  try {

      const session = await auth()

      if(!session || !session.user) {
        throw new ApiError("User is not Authenticated ", 401)
      }
    
      const user = await userModel.findOne({
        email: session.user.email
      }).select("-password")

      if(!user) {
        throw new ApiError("User is not Authenticated ", 401)
      }

      return ApiResponse({
        success: true,
        message: "Current LoggedIn User",
        data: user
      })

  } catch (error) {
    console.log("user/me api error", error);
    return handleError(error);
  }
}
