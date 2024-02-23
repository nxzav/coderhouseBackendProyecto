import CartModel from './models/cart.model.js';

export default class Cart {
  getCarts = async () => await CartModel.find().lean().populate('products.product');

  getCartById = async (cid) => {
    return await CartModel.findById(cid).populate('products.product', [
      'title',
      'price',
      'stock',
    ]);
  };

  createCart = async () => await CartModel.create({});

  addProductInCart = async (cid, pid) => {
    const cart = await CartModel.findById(cid);
    console.log(cart);

    if (!cart) return null;

    const productInCart = cart.products.find((p) => p.product.toString() === pid);

    console.log({ productInCart });
    if (productInCart) productInCart.quantity++;
    else cart.products.push({ product: pid, quantity: 1 });

    cart.save();

    return cart;
  };

  deleteProductInCart = async (cid, pid) => {
    const result = await CartModel.findByIdAndUpdate(
      cid,
      { $pull: { products: { product: pid } } },
      { new: true }
    );

    return result;
  };

  updateProductInCart = async (cid, pid, quantity) => {
    const result = await CartModel.findOneAndUpdate(
      { _id: cid, 'products.product': pid },
      { $set: { 'products.$.quantity': quantity } },
      { new: true }
    );

    return result;
  };

  deleteAllProductsInCart = async (cid) => {
    const result = await CartModel.findByIdAndUpdate(cid, { $set: { 'products': [] } }, { new: true });

    return result;
  };
}
