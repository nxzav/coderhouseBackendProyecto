export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getCarts = async () => this.dao.getCarts();
  getCartById = async (id) => this.dao.getCartById(id);
  createCart = async (user) => this.dao.saveCart(user);
  addProductToCart = async (cid, pid) => {
    const cart = await this.getCartById(cid);
    cart.products.push(pid);

    return this.dao.updateCart(cid, cart);
  };
}
