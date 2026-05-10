import { v2 as cloudinary } from "cloudinary";
import "@/lib/cloudinary";

export const uploadOnCloudinary = async (
  file: Blob
): Promise<string | null> => {
  try {
    if (!file) return null;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
        },

        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url || null);
          }
        }
      );

      uploadStream.end(buffer);
    });

  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};