const express = require("express");
const multer = require("multer");

const { addPic } = require("../controllers/products");

const upload = multer({ dest: "./uploads" });

const router = express.Router();

router.post("/", upload.single("product_picture"), addPic);

module.exports = router;
