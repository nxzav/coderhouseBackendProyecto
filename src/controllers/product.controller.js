import { ProductService } from '../repositories/index.js';

export const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts({ ...req.query });
    return res.json({success: true, products });
  } catch (error) {
    console.log('getProducts error: ', error);
    return res.status(500).json({success: false, msg: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductService.getProductById(pid);
    if (!product)
      return res.status(404).json({ msg: `Product with id ${pid} doesn't exist` });
    return res.json({success: true, product });
  } catch (error) {
    console.log('getProductById error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    newProduct.owner = req._id;
    const product = await ProductService.createProduct(newProduct);

    return res.json({success: true, product });
  } catch (error) {
    console.log('addProduct error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const productToUpdate = req.body;
    const product = await ProductService.updateProduct(pid, productToUpdate);

    return res.json({success: true, product });
  } catch (error) {
    console.log('updateProduct error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { role, _id } = req;
    console.log({role});

    if (role === 'premium') {
      const product = await ProductService.getProductById(pid);
      if (!product) return res.status(404).json({ msg: `Product with ${pid} doesn't exist` });

      if (product.owner.toString() === _id) {
        const result = await ProductService.deleteProduct(pid);
        if (!result) return res.status(400).json({ success: false, msg: 'Could not delete product: ' + pid });
        return res.json({ success: true, msg: 'Product has been deleted', result });
      }
    }
    const result = await ProductService.deleteProduct(pid);
    if (!result) return res.status(400).json({ success: false, msg: 'Could not delete product: ' + pid });
    return res.json({ success: true, msg: 'Product has been deleted', result });
  } catch (error) {
    console.log('deleteProduct error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};
