import ProductModel from './models/product.model.js';

export default class Product {
  getProducts = async ({ limit = 10, page = 1, order = 1, query, available = true }) => {
    limit = Number(limit);
    page = Number(page);
    order = Number(order);

    console.log({ query, limit, page, order, available });

    const search = {};
    if (query) search.title = { $regex: query, $options: 'i' };

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
    result.status = 'success';
    result.prevLink = prevLink;
    result.nextLink = nextLink;
    result.available = available;
    result.order = order;

    delete result.docs;

    return result;
  };

  getProductById = async (pid) => ProductModel.findById(pid);
  saveProduct = async (product) => ProductModel.create(product);
  updateProduct = async (pid, product) => {
    return ProductModel.findByIdAndUpdate(pid, { ...product }, { new: true });
  };
  deleteProduct = async (pid) => ProductModel.findByIdAndDelete(pid);
}
