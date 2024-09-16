const { cloudinary } = require("../cloudinary/cloudinary");

async function uploadImage(image, req) {
  try {
    const userId = req.user.userId;
    const result = await cloudinary.uploader.upload(image, {
      folder:  `SincroProjectPic/${userId}`, 
      upload_preset: "SincroProjectPic",
      public_id: `${new Date().toISOString()}`,
      allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
    });
    console.log("Resultado de Cloudinary:", result);
    if (!result || !result.secure_url) {
      throw new Error("Error al cargar la imagen en Cloudinary");
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = uploadImage;
