const fs = require("fs");

const deleteFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve("deleted");
      return;
    });
  });
};

module.exports = { deleteFile };
