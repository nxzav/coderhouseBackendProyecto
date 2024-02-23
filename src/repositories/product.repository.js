export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = async () => this.dao.getAllProducts();
  getProducts = async (query) => this.dao.getProducts(query);
  getProductById = async (pid) => this.dao.getProductById(pid);
  createProduct = async (product) => this.dao.saveProduct(product);
  updateProduct = async (pid, product) => this.dao.updateProduct(pid, product);
  deleteProduct = async (pid) => this.dao.deleteProduct(pid);
}
