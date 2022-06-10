const express = require("express");
const multer = require("multer");

const authorizeAdmin = require("../middlewares/authorization").authorizeAdmin;

const { addPic } = require("../controllers/products");

const upload = multer({ dest: "./uploads" });

const router = express.Router();

router.post("/", authorizeAdmin, upload.single("product_picture"), addPic);

module.exports = router;
