import { ProductService } from '../services/index.js';

export const getProducts = async (req, res) => {
  const result = await ProductService.getProducts();

  return res.json({ status: 'success', payload: result });
};

export const getProductById = async (req, res) => {
  const { pid } = req.params;
  const result = await ProductService.getProductById(pid);

  return res.json({ status: 'success', payload: result });
};

export const addProduct = async (req, res) => {
  const product = req.body;
  const result = await ProductService.createProduct(product);

  return res.json({ status: 'success', payload: result });
};

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const product = req.body;
  const result = await ProductService.updateProduct(pid, product);

  return res.json({ status: 'success', payload: result });
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  const result = await ProductService.deleteProduct(pid);

  return res.json({ status: 'success', payload: result });
};
