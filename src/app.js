import express from "express";
import {engine} from "express-handlebars";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";

import __dirname from "./utils.js";
import { dbConnect } from "./dbconfig.js";
// Routes
import routerViews from "./routes/views.router.js";
import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";
import routerSession from "./routes/session.router.js";
// Models
import ProductModel from "./models/product.model.js";
import MessageModel from "./models/chat.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Mongo Storage
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      dbName: process.env.DB_NAME,
    }),
    secret: process.env.secret_session,
    resave: true,
    saveUninitialized: true,
  })
);

app.engine('.hbs', engine({extname: '.hbs'}));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use("/", routerViews);
app.use("/api/session", routerSession);
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
