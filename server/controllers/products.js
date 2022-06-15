const cloudinaryClient = require("../utils/cloudinary");
const { deleteFile } = require("../utils/fsutils");

const productModel = require("../models/product");

const createProduct = async (req, res, next) => {
  const price = +req.body.price;
  const title = req.body.title;
  const category = req.body.category;
  if (!isValidPrice(price)) {
    res.status(400).json({ message: "Invalid price" });
  }
  if (!isValidString(title)) {
    res.status(400).json({ message: "Invalid title" });
  }
  try {
    const filePath = req.file.destination + "/" + req.file.filename;
    const image = await cloudinaryClient.uploader.upload(filePath);
    const newProduct = {
      title: title.trim(),
      price: price,
      image: image,
      category: category.toLowerCase().trim(),
    };
    const savedProduct = await productModel.create(newProduct);
    await deleteFile(filePath);

    res.send(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating product: ${error.message}` });
  }
};

const isValidString = (string) => {
  return string && string !== "";
};

const isValidPrice = (price) => {
  return price && price > 0;
};

const searchProducts = async (req, res, next) => {
  try {
    let query = {
      $and: [],
    };

    const title = req.query.title;

    if (isValidString(title)) {
      query.$and.push({
        title: { $regex: title, $options: "i" },
      });
    }
    const category = req.query.category;
    if (isValidString(category)) {
      query.$and.push({ category: category.toLowerCase().trim() });
    }

    const maxPrice = +req.query.maxPrice;
    if (isValidPrice(maxPrice)) {
      query.$and.push({
        price: { $lte: maxPrice },
      });
    }

    if (query.$and.length === 0) {
      query = {};
    }
    console.log(query);
    const result = await productModel.search(query);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error searching products: ${error.message}` });
  }
};

const getProductById = async (req, res, next) => {};

module.exports = { createProduct, searchProducts, getProductById };
