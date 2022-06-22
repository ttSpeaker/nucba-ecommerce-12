const express = require("express");
const multer = require("multer");

const authorizeAdmin = require("../middlewares/authorization").authorizeAdmin;

const {
  createProduct,
  searchProducts,
  getProductById,
} = require("../controllers/products");

const upload = multer({ dest: "./uploads" });

const router = express.Router();

router.post(
  "/",
  authorizeAdmin,
  upload.single("product_picture"),
  createProduct
);

router.get("/search", searchProducts);
router.get("/id/:id", getProductById);

module.exports = router;
