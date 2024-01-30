export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getCarts = async () => this.dao.getCarts();
  getCartById = async (cid) => this.dao.getCartById(cid);
  createCart = async () => this.dao.createCart();
  addProductInCart = async (cid, pid) => this.dao.addProductInCart(cid, pid);
  deleteProductInCart = async (cid, pid) => this.dao.deleteProductInCart(cid, pid);
  updateProductInCart = async (cid, pid, quantity) => this.dao.updateProductInCart(cid, pid, quantity);
  deleteAllProductsInCart = async (cid) => this.dao.deleteAllProductsInCart(cid);
}
