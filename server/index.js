require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const connectMongoDB = require("./utils/mongoclient").connectMongoDB;

const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

const PATH = path.join(__dirname, "..", "client", "build");

app.use(express.static(PATH));

app.get("/*", function (req, res) {
  res.sendFile(PATH + "/index.html");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
};
startServer();
