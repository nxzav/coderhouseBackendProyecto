import { readFileSync, writeFileSync, existsSync } from 'node:fs';

export default class ProductManager {
  static #instance;
  static #id;
  #path;
  #products;

  constructor() {
    ProductManager.#instance = this;
    this.#path = "./src/data/products.json";
    this.#products = this.fileRead();
    ProductManager.#id = this.#products.length > 0 ? this.#products[this.#products.length - 1].id : 0;
  }

  fileRead() {
    try {
      let data;
      if (existsSync(this.#path));
      data = JSON.parse(readFileSync(this.#path, 'utf8'));
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  addProduct(title, description, code, price, status, stock, category, thumbnails) {
    console.log({ title, description, code, price, status, stock, category, thumbnails });
    try {
      let message;

      const codeExists = this.#products.some(e => e.code === code);

      if (codeExists) {
        message = `Ya existe un producto con el código ${code}`;
      } else {
        const newProduct = {
          id: ++ProductManager.#id,
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnails
        }

        if (!Object.values(newProduct).includes(undefined)) {
          this.#products.push(newProduct);
          writeFileSync(this.#path, JSON.stringify(this.#products));
          message = `Producto añadido`
        } else message = `Es necesario rellenar todos los parámetros`;
      }
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    const productId = this.#products.find(e => e.id === id);
    return productId ? productId : `El producto con ID ${id} no existe`;
  }

  updateProduct(id, props) {

    try {
      let message;
      const index = this.#products.findIndex(e => e.id === id);

      if (index != -1) {
        const { id, ...rest } = props;
        this.#products[index] = { ...this.#products[index], ...rest };
        writeFileSync(this.#path, JSON.stringify(this.#products));
        message = `Producto actualizado`;
      } else {
        message = `Producto con ID ${id} no existe`;
      }

      return message;
      
    } catch (error) {
      console.log(error);
    }
  }

  deleteProduct(id) {
    try {
      let message;
      const index = this.#products.findIndex(e => e.id === id);

      if (index >= 0) {
        this.#products.splice(index, 1);
        writeFileSync(this.#path, JSON.stringify(this.#products));
        message = `Producto eliminado`;
      } else {message = `Producto con ID ${id} no encontrado`}

      return message
    } catch (error) {
      console.log(error);
    }
  }
}