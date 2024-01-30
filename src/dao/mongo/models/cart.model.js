import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      quantity: Number,
    },
  ],
});

const CartModel = mongoose.model('carts', cartSchema);
export default CartModel;
