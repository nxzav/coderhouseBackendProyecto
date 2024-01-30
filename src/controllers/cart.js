import { CartService } from '../repositories/index.js';

export const getCarts = async (req, res) => {
  const result = await CartService.getCarts();

  return res.json({ status: 'success', payload: result });
};

export const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await CartService.getCartById(cid);
  
    return res.json({ status: 'success', payload: result });
  } catch (error) {
    console.log("View cart: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createCart = async (req, res) => {
  try {
    const result = await CartService.createCart({});
  
    return res.json({ status: 'success', payload: result });
  } catch (error) {
    console.log("Create cart: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const addProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await CartService.getCartById(cid);
    console.log(result);

    if (!result)
      return res.status(404).json({ msg: `Cart with id ${cid} does not exist` });

    const isProductInCart = result.products.find(e => e.product._id.toString() === pid);
    console.log({isProductInCart});
    if (isProductInCart)
      isProductInCart.quantity++;
    else result.products.push({ product: pid, quantity: 1 });

    result.save();

    return res.json({ msg: "Cart updated", result });
  } catch (error) {
    console.log("Add Product: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const result = await CartService.getCartById(cid)
    const { cid, pid } = req.params;
  
    return res.json({ status: 'success', payload: result });
  } catch (error) {
    console.log("Delete Product: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
