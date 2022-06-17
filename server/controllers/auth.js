const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../models/user");

const registerUser = async (req, res, next) => {
  try {
    const userBody = req.body;
    if (!validPassword(userBody.password)) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }
    if (await searchUserByEmail(userBody.email)) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    const hash = await bcrypt.hash(userBody.password, 10);
    newUser = {
      firstName: userBody.firstName,
      lastName: userBody.lastName,
      email: userBody.email,
      password: hash,
    };
    await users.createUser(newUser);
    res.json("created user OK");
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};
const loginUser = async (req, res, next) => {
  const userBody = req.body;
  const user = await searchUserByEmail(userBody.email);
  if (user) {
    const result = await bcrypt.compare(userBody.password, user.password);
    if (result) {
      const accessToken = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: getUserRole(user),
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 6000 }
      );
      res.json({ accessToken: accessToken });
      return;
    }
  }
  res.status(403).json({ message: "Email and password not valid" });
};

const logoutUser = async (req, res, next) => {};

const searchUserByEmail = async (email) => {
  const user = await users.findUserByEmail(email);
  return user;
};
const validPassword = (password) => {
  return password;
};

const getUserRole = (user) => {
  if (user.role === "admin") {
    return "admin";
  }
  return "none";
};

module.exports = { registerUser, loginUser, logoutUser };
