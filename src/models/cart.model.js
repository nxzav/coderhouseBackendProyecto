import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: Number,
      quantity: Number,
    },
  ],
});

const CartModel = mongoose.model("carts", cartSchema);
export default CartModel;