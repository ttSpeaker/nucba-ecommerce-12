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
  let user;
  try {
    user = await searchUserByEmail(userBody.email);
    if (!user) {
      res.status(500).json({ message: "Could not retrieve user from DB" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Could not retrieve user from DB", error });
    return;
  }

  const isUserPasswordOK = await checkUserPassword(
    userBody.password,
    user.password
  );
  if (!isUserPasswordOK) {
    res.status(403).json({ message: "Email and password not valid" });
    return;
  }

  const accessToken = signToken(user, process.env.ACCESS_TOKEN_SECRET, 10);
  const refreshToken = signToken(
    user,
    process.env.REFRESH_TOKEN_SECRET,
    60 * 60 * 24 * 7
  );

  try {
    await addTokenToUser(user, refreshToken);

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

const signToken = (user, secret, expiration) => {
  const token = jwt.sign(
    {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: getUserRole(user),
    },
    secret,
    { expiresIn: expiration }
  );
  return token;
};

const addTokenToUser = async (user, refreshToken) => {
  if (user.tokens && user.tokens.length > 0) {
    user.tokens.push(refreshToken);
  } else {
    user.tokens = [refreshToken];
  }
  await users.updateUser(user);
};

const checkUserPassword = async (received, hash) => {
  try {
    const result = await bcrypt.compare(received, hash);
    return result;
  } catch (error) {
    return false;
  }
};
const refreshToken = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader) {
    res.status(401).json({ message: "Missing token: not authorized" });
    return;
  }
  const token = tokenHeader.split(" ")[1];
  try {
    //validar el refresh token y la firma
    const data = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    //buscar el user en la DB
    const user = await users.findUserById(data.id);

    //buscar que el token recibido este en la lista de tokens disponibles del usuario (y removerlo, solo se usa una vez)
    const indexOfToken = user.tokens.indexOf(token);
    if (indexOfToken === -1) {
      // SI NO ESTA EL TOKEN EN LA LISTA DE LOS DISPONIBLES, YA NO PUEDE USARSE PARA OBTENER NUEVOS TOKENS
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    const userOldToken = user.tokens.splice(indexOfToken, 1).pop();

    //si el usuario tiene en la lista de tokens disponibles al mismo token que nos envio
    // este lo pusimos ahi cuando hizo el login, o cuando hizo el refreshToken
    if (userOldToken) {
      const accessToken = signToken(
        userOldToken,
        process.env.ACCESS_TOKEN_SECRET,
        10
      );
      const refreshToken = signToken(
        user,
        process.env.REFRESH_TOKEN_SECRET,
        60 * 60 * 24 * 7
      );
      await addTokenToUser(user, refreshToken);

      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: "Not authorized", error: e.message });
    return;
  }
};

const logoutUser = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader) {
    res.status(401).json({ message: "Missing token: not authorized" });
    return;
  }
  const token = tokenHeader.split(" ")[1];
  try {
    //validar el refresh token y la firma
    const data = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    //buscar el user en la DB
    const user = await users.findUserById(data.id);

    //buscar que el token recibido este en la lista de tokens disponibles del usuario (y removerlo, solo se usa una vez)
    const indexOfToken = user.tokens.indexOf(token);
    if (indexOfToken === -1) {
      // SI NO ESTA EL TOKEN EN LA LISTA DE LOS DISPONIBLES, YA NO PUEDE USARSE PARA OBTENER NUEVOS TOKENS
      res.json({ message: "Logged out" });
      return;
    }

    user.tokens.splice(indexOfToken, 1).pop();

    await users.updateUser(user);
    res.json({ message: "Logged out" });
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: "Not authorized", error: e.message });
    return;
  }
};

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

module.exports = { registerUser, loginUser, logoutUser, refreshToken };
