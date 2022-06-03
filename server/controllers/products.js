const cloudinaryClient = require("../utils/cloudinary");

const addPic = async (req, res, next) => {



  cloudinaryClient.uploader.upload(
    "./" + req.file.path,
    function (error, result) {
      console.log(result);
      res.send(result.url);
    }
  );

};

module.exports = { addPic };
