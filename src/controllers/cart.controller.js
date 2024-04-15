import { CartService, ProductService, TicketService, UserService } from '../repositories/index.js';
import { v4 as uuidv4 } from 'uuid';

export const getCarts = async (req, res) => {
  try {
    const carts = await CartService.getCarts();
    return res.json({success: true, carts });
  } catch (error) {
    console.log('getCarts error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartService.getCartById(cid);

    return res.json({success: true, cart });
  } catch (error) {
    console.log('getCartById error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};

export const createCart = async (req, res) => {
  try {
    const cart = await CartService.createCart({});

    return res.json({success: true, cart });
  } catch (error) {
    console.log('createCart error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};

export const addProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { role, _id } = req;
    const productExists = await ProductService.getProductById(pid);

    if (role === 'premium') {
      const product = await ProductService.getProductById(pid);
      if (!product) return res.status(404).json({ msg: `Product with ${pid} doesn't exist` });

      if (product.owner.toString() === _id) {
        return res.status(400).json({ success: false, msg: 'Premium users can not buy their own products' });
      }
    }

    if (!productExists)
      return res.status(404).json({ success: false, msg: 'Product does not exist' });

    const result = await CartService.addProductInCart(cid, pid);

    if (!result)
      return res.status(404).json({ success: false, msg: `Cart with id ${cid} does not exist` });

    return res.json({success: true, result });
  } catch (error) {
    console.log('addProductInCart error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};

export const deleteProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const productExists = await ProductService.getProductById(pid);
    if (!productExists)
      return res.status(400).json({ success: false, msg: 'Product does not exist' });
    const result = await CartService.deleteProductInCart(cid, pid);

    return res.json({success: true, result });
  } catch (error) {
    console.log('deleteProductInCart error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};

export const updateProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const productExists = await ProductService.getProductById(pid);
    if (!productExists)
      return res.status(400).json({ msg: 'Product does not exist' });
    const result = await CartService.updateProductInCart(cid, pid, quantity);

    return res.json({success: true, result });
  } catch (error) {
    console.log('updateProductInCart error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};

export const deleteAllProductsInCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await CartService.deleteAllProductsInCart(cid);

    return res.json({success: true, result });
  } catch (error) {
    console.log('deleteAllProductsInCart error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};

export const completePurchase = async (req, res) => {
  try {
    const { _id } = req;
    const { cid } = req.params;
    const user = await UserService.getUserById(_id);
    if (!(user.cart.toString() === cid)) return res.status(400).json({ success: false, msg: 'Cart is not valid' });

    const cart = await CartService.getCartById(cid);
    if (!(cart.products.length > 0)) return res.status(400).json({ success: false, msg: 'Empty cart' });

    const productsWithValidStock = cart.products.filter(p => p.product.stock >= p.quantity);

    const updateProductsStock = productsWithValidStock.map((p) =>
      ProductService.updateProduct(p.product._id, { stock: p.product.stock - p.quantity })
    );
    await Promise.all(updateProductsStock);

    const items = productsWithValidStock.map((p) => ({
      title: p.product.title,
      price: p.product.price,
      quantity: p.quantity,
      total: p.product.price * p.quantity,
    }));

    let amount = 0;
    items.forEach((product) => { amount += product.total });
    const purchaser = user.email;
    const code = uuidv4();
    await TicketService.createTicket({ items, amount, purchaser, code });
    await CartService.deleteAllProductsInCart(user.cart);

    return res.json({
      success: true,
      ticket: { code, client: purchaser, items, amount },
    });
  } catch (error) {
    console.log('Complete purchase error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
}