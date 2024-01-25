import {v2 as cloudinary} from 'cloudinary';


const Cloudinary = cloudinary;

function ConfigCloudinary(cloud_name, api_key, api_secret) {
  Cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

//ubicación relativa
async function UploadPicture(file) {
  try {
    const { path } = file;

    const res = await cloudinary.uploader.upload(path, {
      resource_type: "image",
    });

    return res;
  } catch (ex) {
    console.log(ex);
  }
}

export{
  UploadPicture,
  ConfigCloudinary,
};