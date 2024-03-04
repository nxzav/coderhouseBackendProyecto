import { ProductService } from '../repositories/index.js';

export const getProducts = async (req, res) => {
  try {
    const result = await ProductService.getProducts({ ...req.query });
    return res.json({ result });
  } catch (error) {
    console.log('getProducts error: ', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await ProductService.getProductById(pid);
    if (!result)
      return res.status(404).json({ msg: `El producto con id ${pid} no existe` });
    return res.json({ result });
  } catch (error) {
    console.log('getProductById error: ', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    product.owner = req._id;
    const result = await ProductService.createProduct(product);

    return res.json({ result });
  } catch (error) {
    console.log('addProduct error: ', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const result = await ProductService.updateProduct(pid, product);

    return res.json({ result });
  } catch (error) {
    console.log('updateProduct error: ', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { role, _id } = req;
    console.log({role});

    if (role === 'premium') {
      const product = await ProductService.getProductById(pid);
      if (!product) return res.status(404).json({ msg: `El producto con id ${pid} no existe` });

      if (product.owner.toString() === _id) {
        const result = await ProductService.deleteProduct(pid);
        if (result) return res.json({ success: true, msg: 'Producto eliminado', result });
        return res.status(400).json({ success: false, msg: 'No se pudo eliminar el producto con id: ' + pid });
      }
    }
    const result = await ProductService.deleteProduct(pid);
    if (result) return res.json({ success: true, msg: 'Producto eliminado', result });
    return res.status(400).json({ success: false, msg: 'No se pudo eliminar el producto con id: ' + pid });
  } catch (error) {
    console.log('deleteProduct error: ', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};
