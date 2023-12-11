import { request, response } from "express";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";

export const getProducts = async ({limit = 10, page = 1, order = 1, query, available = true}) => {
  try {
    limit = Number(limit);
    page = Number(page);
    order = Number(order);

    console.log({query, limit, page, order, available});
  
    const search = {};
    if (query) search.title = { $regex: query, $options: "i" };
  
    const result = await ProductModel.paginate(search, {
      page,
      limit,
      sort: { price: order },
      lean: true,
    });
  
    let prevLink;
    let nextLink;
    result.prevPage !== null
      ? (prevLink = `/?page=${page - 1}`)
      : (prevLink = null);
    result.nextPage !== null
      ? (nextLink = `/?page=${page + 1}`)
      : (nextLink = null);

    result.payload = result.docs;
    result.query = query;
    result.status = "success";
    result.prevLink = prevLink;
    result.nextLink = nextLink;
    result.available = available;
    result.order = order;
  
    delete result.docs;

    return result;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductById = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const result = await ProductModel.findById(pid);
    if (!result)
      return res
        .status(404)
        .json({ msg: `Product with id: ${pid} doesn't exist.` });
    res.json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const addProduct = async (req = request, res = response) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    if ((!title, !description, !code, !price, !status, !stock, !category))
      return res.status(404).json({ msg: "All fields are required" });

    const addedProduct = await ProductModel.create({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });

    return res.json({ addedProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const updateProduct = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const { _id, ...rest } = req.body;
    const result = await ProductModel.findByIdAndUpdate(
      pid,
      { ...rest },
      { new: true }
    );

    if (result) return res.json({ msg: "Product updated", result });
    return res.status(404).json({ msg: `Can't update product with id ${pid}` });
  } catch (error) {}
};

export const deleteProduct = async (req = request, res = response) => {
  try {
    const { pid } = req.params;
    const result = await ProductModel.findByIdAndDelete(pid);
    if (result) return res.json({ msg: "Producto eliminado", result });
    return res.status(404).json({ msg: `Product with ${id} not deleted` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};