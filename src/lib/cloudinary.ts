import { v2 as cloudinary } from 'cloudinary'


if(  !process.env.CLOUDINARY_CLOUD_NAME ||
     !process.env.CLOUDINARY_API_KEY ||
     !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary configuration is missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables.');
}

export const cloudinaryConfig = cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});