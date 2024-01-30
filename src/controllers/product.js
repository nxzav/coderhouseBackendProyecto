import { ProductService } from '../repositories/index.js';

export const getProducts = async (req, res) => {
  try {
    const result = await ProductService.getProducts({ ...req.query });
    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await ProductService.getProductById(pid);
    if (!result) return res.status(404).json({msg: `El producto con id ${pid} no existe`})
    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ msg: 'Internal server error' });
  }
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
