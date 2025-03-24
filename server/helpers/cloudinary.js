const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({ cloud_name: "", api_key: "", api_secret: "" });
const storage = new multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

module.exports = { upload, imageUploadUtil };
