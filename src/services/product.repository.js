export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = async () => this.dao.getProducts();
  getProductById = async (id) => this.dao.getProductById(id);
  createProduct = async (product) => this.dao.saveProduct(product);
  updateProduct = async (id, product) => this.dao.updateProduct(id, product);
  deleteProduct = async (product) => this.dao.deleteProduct(product);
}
