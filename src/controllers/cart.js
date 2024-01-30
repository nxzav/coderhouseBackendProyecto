import { CartService, ProductService } from '../repositories/index.js';

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
    console.log('View cart: ', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const createCart = async (req, res) => {
  try {
    const result = await CartService.createCart({});

    return res.json({ status: 'success', payload: result });
  } catch (error) {
    console.log('Create cart: ', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const addProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const productExists = await ProductService.getProductById(pid);

    if (!productExists)
      return res.status(400).json({ ok: false, msg: 'El producto no existe' });

    const result = await CartService.addProductInCart(cid, pid);

    if (!result)
      return res.status(404).json({ msg: `El carrito con id ${cid} no existe!` });

    return res.json({ result });
  } catch (error) {
    console.log('Add Product: ', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const deleteProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const productExists = await ProductService.getProductById(pid);
    if (!productExists) return res.status(400).json({ msg: 'El producto no existe' });
    const result = await CartService.deleteProductInCart(cid, pid);

    return res.json({ result });
  } catch (error) {
    console.log('Delete Product: ', error);
    return res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const updateProductInCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const productExists = await ProductService.getProductById(pid);
  if (!productExists)
    return res.status(400).json({ msg: 'El producto no existe' });
  const result = await CartService.updateProductInCart(cid, pid, quantity);

  return res.json({ result });
};

export const deleteAllProductsInCart = async (req, res) => {
  const { cid } = req.params;
  const result = await CartService.deleteAllProductsInCart(cid);

  return res.json({result});
}
