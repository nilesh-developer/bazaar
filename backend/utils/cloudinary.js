// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// // Configuration
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_CLOUD_API,
//     api_secret: process.env.CLOUDINARY_CLOUD_SECRET // Click 'View Credentials' below to copy your API secret
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         // Upload an image
//         const uploadResult = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         fs.unlinkSync(localFilePath)
//         //file is uploaded on cloudinary
//         console.log(uploadResult.secure_url);
//         return uploadResult.secure_url;

//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         console.log(error)
//         return null
//     };  
// }

// export { uploadOnCloudinary }


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const fileExt = path.extname(localFilePath).toLowerCase();

    // Detect resource type (image or raw)
    const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(fileExt);
    const resourceType = isImage ? "image" : "raw";

    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // Delete local temp file
    fs.unlinkSync(localFilePath);

    // For images → normal secure_url
    if (isImage) {
      console.log("✅ Image uploaded:", uploadResult.secure_url);
      return uploadResult.secure_url;
    }

    // For files (PDFs, ZIPs, etc.) → direct download link
    const downloadUrl = cloudinary.url(uploadResult.public_id, {
      resource_type: "raw",
      attachment: true,
      format: fileExt.replace(".", ""),
    });

    console.log("✅ File uploaded:", downloadUrl);
    return downloadUrl;

  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
