import {v2 as cloudinary} from 'cloudinary';

function ConectCloudinary (CloudN,ApiK,ApiS){      
 cloudinary.config({ 
    cloud_name:CloudN,
    api_key:ApiK,  
    api_secret:ApiS
  })}


   function UploadPicture(req,res){
        const {path}=req

        const result= cloudinary.uploader.upload(path,{
             resource_type: "image",
           });
   
    return result
  }

  export{UploadPicture,
ConectCloudinary};