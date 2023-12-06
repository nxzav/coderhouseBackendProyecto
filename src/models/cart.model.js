import { Schema, model } from "mongoose";

const cartCollection = "carts";
const cartSchema = new Schema({
  products: [
    {
      _id: false,
      product: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number,
    },
  ],
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});

const CartModel = model(cartCollection, cartSchema);
export default CartModel;