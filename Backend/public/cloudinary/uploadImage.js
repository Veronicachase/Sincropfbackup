const {cloudinary} = require('../cloudinary/cloudinary')

async function uploadImage(image) {
    console.log(image)
    try {
        const result = await cloudinary.uploader.upload(
            image,
            {
                upload_preset: "presets",
                public_id: `${new Date().toISOString()}`, 
                allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
            }
        );
        console.log(result);
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