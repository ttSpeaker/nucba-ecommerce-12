const getDb = require("../utils/mongoclient").getDb;

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

module.exports = { createUser, findUserByEmail };
