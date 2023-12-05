import {Schema, model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionP = "products";
const productSchema = new Schema({
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
  thumbnails: [{type: String}],
});

productSchema.plugin(mongoosePaginate);

const ProductModel = model(collectionP, productSchema);
export default ProductModel;