import { auth } from "@/auth";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { connectDb } from "@/lib/db";
import { handleError } from "@/lib/handleError";
import partnerDocsModel from "@/models/partnerDocs.model";
import userModel from "@/models/user.model";
import { uploadOnCloudinary } from "@/utils/uploadOnCloudinary";
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

    const formData = await req.formData();

    const aadhar = formData.get("aadhar") as Blob;
    const license = formData.get("license") as Blob;
    const rc = formData.get("rc") as Blob;

    if (!aadhar || !license || !rc) {
      throw new ApiError("All Documents are required", 401);
    }

    // Parallel Upload
    const [aadharUrl, licenseUrl, rcUrl] = await Promise.all([
      uploadOnCloudinary(aadhar),
      uploadOnCloudinary(license),
      uploadOnCloudinary(rc),
    ]);

    if (!aadharUrl || !licenseUrl || !rcUrl) {
      throw new ApiError("Documents Upload failed", 500);
    }

    // Create OR Update
    const partnerDocs = await partnerDocsModel.findOneAndUpdate(
      {
        owner: user._id,
      },
      {
        owner: user._id,
        aadharUrl,
        licenseUrl,
        rcUrl,
        status: "pending",
        rejectionReason: "",
      },
      {
        new: true,
        upsert: true,
      },
    );

    return ApiResponse({
      success: true,
      message: "Documents uploaded successfully",
      data: partnerDocs,
    });
  } catch (error) {
    console.log("partner/onboard/document(post) api error", error);
    return handleError(error);
  }
}
