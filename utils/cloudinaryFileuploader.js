import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY
});


export async function fileuploder(localfile) {

  try {
    const response = await cloudinary.uploader.upload(localfile, {
      resource_type: 'auto'
    })

    console.log("file uploaded successfully", response.url);

    return response;
  } catch (err) {
    fs.unlink(localfile)

    return;
  }
}



