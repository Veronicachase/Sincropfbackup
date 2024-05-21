const multer = require('multer');

const { storage } = require('../cloudinary/cloudinary'); 
const upload = multer({ storage });

module.exports = upload;