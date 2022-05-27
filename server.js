const path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", (req, res, next) => {
  res.send("Hello api");
});
app.use("/*", express.static(path.join(__dirname + "./client/build")));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
