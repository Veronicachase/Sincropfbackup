const cloudinary = require("cloudinary").v2



CLOUD_NAME=process.env.CLOUD_NAME
API_KEY=process.env.API_KEY
API_SECRET=process.env.API_SECRET
CLOUDINARY_URL=process.env.CLOUDINARY_URL


// Upload an image
// const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//     public_id: "shoes"
// }).catch((error)=>{console.log(error)});


module.exports=cloudinary