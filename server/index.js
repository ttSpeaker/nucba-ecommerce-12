const path = require("path");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api", (req, res, next) => {
  res.send("Hello api");
});

const PATH = path.join(__dirname, "..", "client", "build");

app.use(express.static(PATH));

app.get("/*", function (req, res) {
  res.sendFile(PATH + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
