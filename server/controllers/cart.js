const cartModel = require("../models/cart");

const addItem = async (req, res, next) => {
  try {
    const user = req.user;
    const item = req.body;
    let cart = await cartModel.getByUserId(user.id);
    if (cart) {
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].id === item.id) {
          cart.items[i].quantity += item.quantity;
          cart = await cartModel.update(cart);
          res.json(cart);
          return;
        }
      }
      cart.items.push(item);
      cart = await cartModel.update(cart);
      res.json(cart);
      return;
    }

    const newCart = await cartModel.create({
      userId: user.id,
      items: [item],
      checkout: false,
    });
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItem = async (req, res, next) => {};

const retrieveCart = async (req, res, next) => {};

module.exports = { addItem, removeItem, retrieveCart };
