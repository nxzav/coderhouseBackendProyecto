import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: {
    type: String,
    unique: true,
  },
  price: Number,
  status: {
    type: Boolean,
    default: true,
  },
  stock: Number,
  category: String,
  thumbnails: [],
});

const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;