import { v2 as cloudinary } from "cloudinary";
import {CLOUDINARY_API_KEY,CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET} from "../config.js"


 export const uploadImage = async (filePath) => {
  // Configuration
  cloudinary.config({
    cloud_name: "dvvuuxwxz",
    api_key: "983433394724938",
    api_secret:"_FI8dtUk9cH7eJ9wKhFvKaCMHUE",
    secure: true
  });

//   Upload an image
 return await cloudinary.uploader.upload(filePath, {
    folder: "replit"
  });

 
};
