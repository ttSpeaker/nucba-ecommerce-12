const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let db;

const connectMongoDB = async () => {
  try {
    const connection = await MongoClient.connect(process.env.MONGO_URL);
    db = connection.db("ecommerce12");
  } catch (error) {
    throw new Error("Error connecting to MongoDB: " + error);
  }
};

const getDb = () => {
  if (db) {
    return db;
  }
  throw new Error("MongoDB not initialized");
};

module.exports = { connectMongoDB, getDb };
