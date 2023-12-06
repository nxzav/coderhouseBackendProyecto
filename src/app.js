import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import "dotenv/config";

import __dirname from "./utils.js";

import routerViews from "./routes/views.router.js";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import ProductModel from "./models/product.model.js";
import MessageModel from "./models/chat.model.js";
import { dbConnect } from "./dbconfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", routerViews);
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

const PORT = process.env.PORT || 8080;

await dbConnect();

const httpServer = app.listen(PORT, () =>
  console.log(`Running... PORT: ${PORT}`)
);
const io = new Server(httpServer);

const getProducts = () => ProductModel.find().lean().exec();
const getMessages = () => MessageModel.find().lean().exec();

io.on("connection", async (socket) => {
  console.log("New Socket");

  // Chat
  const messages = await getMessages();
  socket.emit("logs", messages);

  socket.on("message", async (newMessage) => {
    console.log(newMessage);
    const result = await MessageModel.create(newMessage);
    console.log({ result });
    const updatedMessages = await getMessages();
    io.emit("logs", updatedMessages);
  });

  // Real Time Products
  const products = await getProducts();
  socket.emit("products", products);

  socket.on("addProduct", async (product) => {
    const result = await ProductModel.create(product);
    console.log(result);
    const products = await getProducts();
    socket.emit("products", products);
  });

  socket.on("delete", async ({ confirm, productID }) => {
    if (confirm === "Y") {
      console.log({ confirm });
      console.log({ productID });
      await ProductModel.deleteOne({ _id: productID });
      const products = await getProducts();
      socket.emit("products", products);
    } else console.log("Product not deleted");
  });
});
