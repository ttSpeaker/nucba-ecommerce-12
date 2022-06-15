const getDb = require("../utils/mongoclient").getDb;

const PRODUCTS_COLLECTION = "products";

const create = async (product) => {
  try {
    const collection = getDb().collection(PRODUCTS_COLLECTION);
    await collection.insertOne(product);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};

const search = async (params) => {
  try {
    const collection = getDb().collection(PRODUCTS_COLLECTION);
    const result = await collection.find(params).toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { create, search };
