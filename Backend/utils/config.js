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


