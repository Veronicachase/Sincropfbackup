const {cloudinary} = require('../cloudinary/cloudinary')

async function uploadImage(image) {
    console.log(image)
    try {
        const result = await cloudinary.uploader.upload(
            image,
            {
                upload_preset: "presets",
                public_id: `${new Date().toISOString()}`, // Utiliza toISOString para obtener un formato de fecha estándar
                allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "jfif", "webp"],
            }
        );
        console.log(result);
        return result; // Devuelve el resultado para que pueda ser usado en otros lugares
    } catch (error) {
        console.error(error);
        throw error; // Lanza el error para que pueda ser manejado en el lugar donde se llama a la función
    }
}

module.exports = uploadImage;