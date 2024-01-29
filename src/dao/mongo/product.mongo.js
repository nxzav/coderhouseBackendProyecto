import ProductModel from './models/product.model.js';

export default class Product {
  getProducts = async () => ProductModel.find();
  getProductById = async (id) => ProductModel.findById(id);
  saveProduct = async (product) => ProductModel.create(product);
  updateProduct = async (id, product) => {
    return ProductModel.updateOne({ _id: id }, { $set: product });
  };
  deleteProduct = async (id) => ProductModel.findByIdAndDelete(id);
}
