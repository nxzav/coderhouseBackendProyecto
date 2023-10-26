import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export default class Cart {
  static #id;
  #path;
  #carts;

  constructor() {
    this.#path = './src/data/carts.json';
    this.#carts = this.fileRead();
    Cart.#id = this.#carts.length > 0 ? this.#carts[this.#carts.length - 1].id : 0;
  }

  fileRead() {
    try {
      let data;
      if (existsSync(this.#path))
        data = JSON.parse(readFileSync(this.#path, 'utf8'));
      else
        data = [];
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  addCart() {
    try {
      const newCart = {
        id: ++Cart.#id,
        products: [],
      }
      this.#carts.push(newCart);
      writeFileSync(this.#path, JSON.stringify(this.#carts));
      return 'Carrito creado';

    } catch (error) {
      console.log(error);
    }
  }

  getCarts() {
    return this.#carts;
  }

  getCartById(id) {
    const cartId = this.#carts.find(e => e.id === id);
    if (!cartId) return `Producto con ID ${id} no existe`;
    return cartId;
  }
}