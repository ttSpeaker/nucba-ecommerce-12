const jwt = require("jsonwebtoken");

const authorizeAdmin = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader) {
    res.status(401).json({ message: "Missing token: not authorized" });
    return;
  }
  const token = tokenHeader.split(" ")[1];
  try {
    const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (data.role !== "admin") {
      res.status(403).json({ message: "Not authorized: must be admin" });
      return;
    }
    req.user = {
      id: data.id,
      email: data.email,
      role: data.role,
    };
    return next();
  } catch (e) {
    res.status(403).json({ message: "Not authorized", error: e });
    return;
  }
};

const userLoggedIn = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader) {
    res.status(401).json({ message: "Missing token: not authorized" });
    return;
  }
  const token = tokenHeader.split(" ")[1];
  try {
    const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = {
      id: data.id,
      email: data.email,
      role: data.role,
    };
    return next();
  } catch (e) {
    res.status(403).json({ message: "Not authorized", error: e });
    return;
  }
};

module.exports = { authorizeAdmin, userLoggedIn };
