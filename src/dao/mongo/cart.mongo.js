import CartModel from './models/cart.model.js';

export default class Cart {
  getCarts = async () => CartModel.find();
  getCartById = async (id) => CartModel.findById(id);
  saveCart = async (cart) => CartModel.create(cart);
  updateCart = async (id, cart) => {
    return CartModel.updateOne({ _id: id }, { $set: cart });
  };
}
