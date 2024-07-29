import { cloudinary } from "./cloudinaryConfig.js";

const uploadToCloudinary = (fileUri, fileName) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(fileUri, {
          invalidate: true,
          resource_type: "auto",
          filename_override: fileName,
          folder: "socialApp", // any sub-folder name in your cloud
          use_filename: true,
        })
        .then((result) => {
          resolve({ success: true, result });
        })
        .catch((error) => {
          reject({ success: false, error });
        });
    });
  };
  
  export { uploadToCloudinary };