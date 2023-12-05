import { request, response } from "express";
import ProductModel from "../models/product.model.js";

export const getProducts = async (req = request, res = response) => {
  try {
    const result = await ProductModel.find();
    res.json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
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