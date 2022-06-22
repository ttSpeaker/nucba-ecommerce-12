const express = require("express");

const userLoggedIn = require("../middlewares/authorization").userLoggedIn;
const cartController = require("../controllers/cart");

const router = express.Router();

router.use(userLoggedIn);

router.post("/", cartController.addItem);
router.delete("/", cartController.removeItem);
router.get("/", cartController.retrieveCart);

module.exports = router;
