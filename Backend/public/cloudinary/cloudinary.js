console.log("Cargando cloudinary.js");
require('../../utils/config')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
 
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'SincroProjectPic',
    resource_type: 'auto',
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

module.exports = {
  cloudinary,
  storage,
};
