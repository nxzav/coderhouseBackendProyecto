import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
          },
        ],
        default: [],
      },
      quantity: Number,
    },
  ],
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});

const CartModel = mongoose.model("carts", cartSchema);
export default CartModel;