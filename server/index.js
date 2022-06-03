const path = require("path");
const express = require("express");

const productRouter = require("./routes/products");
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/products", productRouter);

const PATH = path.join(__dirname, "..", "client", "build");

app.use(express.static(PATH));

app.get("/*", function (req, res) {
  res.sendFile(PATH + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
