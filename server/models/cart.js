const getDb = require("../utils/mongoclient").getDb;

const CARTS_COLLECTION = "carts";

const create = async (cart) => {
  try {
    const collection = getDb().collection(CARTS_COLLECTION);
    await collection.insertOne(cart);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (cart) => {
  try {
    const collection = getDb().collection(CARTS_COLLECTION);
    await collection.replaceOne({ _id: cart._id }, cart);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

const getByUserId = async (userId) => {
  try {
    console.log("Getting cart for user:", userId);
    const collection = getDb().collection(CARTS_COLLECTION);
    const cart = await collection.findOne({ userId: userId });
    console.log("Cart found:", cart);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { create, update, getByUserId };
