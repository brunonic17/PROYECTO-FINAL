import {v2 as cloudinary} from 'cloudinary';

function ConectCloudinary (CloudN,ApiK,ApiS){      
 cloudinary.config({ 
    cloud_name:CloudN,
    api_key:ApiK,  
    api_secret:ApiS
  })}


   function UploadPicture(req,res){
        const {path}=req;
        
        const result= cloudinary.uploader.upload(path,{
             resource_type: "image",
           });
   
    return result
  };

  function DeletePicture(req,res){
    const _id=req;
    
    const result= cloudinary.uploader.destroy(_id);

return result
}



  export{UploadPicture,
        ConectCloudinary,
        DeletePicture};