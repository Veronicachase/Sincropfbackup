const dotenv = require('dotenv');
const path = require('path');

let envFilePath;

if (process.env.NODE_ENV === 'production') {
  envFilePath = path.resolve(__dirname, '../.env.production');
} else if (process.env.NODE_ENV === 'development') {
  envFilePath = path.resolve(__dirname, '../.env.development');
} else {
  envFilePath = path.resolve(__dirname, '../.env'); 
}

dotenv.config({ path: envFilePath });
console.log("Entorno actual:", process.env.NODE_ENV);

console.log("Variables de entorno cargadas en config.js:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
