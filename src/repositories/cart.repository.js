export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getCarts = async () => await this.dao.getCarts();
  getCartById = async (cid) => await this.dao.getCartById(cid);
  createCart = async () => await this.dao.createCart();
  addProductInCart = async (cid, pid) => await this.dao.addProductInCart(cid, pid);
  deleteProductInCart = async (cid, pid) => await this.dao.deleteProductInCart(cid, pid);
  updateProductInCart = async (cid, pid, quantity) => await this.dao.updateProductInCart(cid, pid, quantity);
  deleteAllProductsInCart = async (cid) => await this.dao.deleteAllProductsInCart(cid);
}
