import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";

import __dirname from "./utils.js";

import routerViews from "./routes/views.router.js";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import ProductModel from "./models/product.model.js";

const app = express();
const MONGODB_URI =
  "mongodb+srv://nxzdev:zGH3Z6HsGSvpphJL@cluster0.8j0u18n.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", routerViews);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGODB_URI, { dbName: "ecommerce" })
  .then((e) => console.log("DB connected"))
  .catch((e) => console.error(e));

const httpServer = app.listen(PORT, () => console.log("Running..."));
const io = new Server(httpServer);

function getProducts() {
  return ProductModel.find().lean().exec();
}

io.on("connection", async (socket) => {
  console.log("New Socket");
  const products = await getProducts();
  socket.emit("products", products);

  socket.on("post", async (data) => {
    const products = await getProducts();
    socket.emit("products", products);
    console.log("Product added");
  });

  socket.on("delete", async ({ confirm, productID }) => {
    if (confirm === "Y") {
      console.log(confirm);
      console.log(productID);
      await ProductModel.deleteOne({ _id: productID });
      const products = await getProducts();
      socket.emit("products", products);
    } else console.log("Product not deleted");
  });
});

// const io = new Server(httpServer);

// const p = new ProductManager();

// io.on('connection', (socket) => {
//   console.log('New socket');

//   socket.emit('products', p.getProducts());

//   socket.on('products', ({productID, confirm}) => {
//     if (confirm === 'Y') {
//       console.log(`Product ${Number(productID)} deleted`);
//       p.deleteProduct(Number(productID));
//       socket.emit('products', p.getProducts());
//     } else {
//       console.log(`Product ${productID} not deleted`);
//       socket.emit('products', p.getProducts());
//     }
//   });

//   socket.on('addProduct', data => {
//     const { title, description, code, price, status, stock, category, thumbnails } = data;
//     const result = p.addProduct(title, description, code, price, status, stock, category, thumbnails);
//     console.log(result);
//     JSON.stringify(result);
//     socket.emit('products', p.getProducts());
//   });
// });
