const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const cloudinaryClient = cloudinary.v2;

module.exports = cloudinaryClient;
