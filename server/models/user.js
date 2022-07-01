const getDb = require("../utils/mongoclient").getDb;
const ObjectId = require("mongodb").ObjectId;

const USERS_COLLECTION = "users";
const createUser = async (newUser) => {
  try {
    const db = getDb();
    await db.collection(USERS_COLLECTION).insertOne(newUser);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const findUserByEmail = async (email) => {
  try {
    const db = getDb();
    const result = await db
      .collection(USERS_COLLECTION)
      .findOne({ email: email });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const findUserById = async (id) => {
  try {
    const db = getDb();
    const result = await db
      .collection(USERS_COLLECTION)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (user) => {
  try {
    const db = getDb();
    await db.collection(USERS_COLLECTION).replaceOne({ _id: user._id }, user);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = { createUser, findUserByEmail, findUserById, updateUser };
