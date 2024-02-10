import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
// Utils config
import __dirname from './utils.js';
import initializePassport from './config/passport.config.js';
// Routes
import routerViews from './routes/views.router.js';
import routerProducts from './routes/products.router.js';
import routerCarts from './routes/carts.router.js';
import routerSession from './routes/session.router.js';
import routerJWT from './routes/jwt.router.js';
// Services
import { ProductService, MessageService } from './services/index.js';
// Initialize express
const app = express();
// Config express
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Mongo Storage Session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoURI,
      dbName: config.mongoDBName,
    }),
    secret: config.secretSession,
    resave: true,
    saveUninitialized: true,
  })
);

// Passport initialize
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// App routing
app.use('/', routerViews);
app.use('/api/jwt', routerJWT);
app.use('/api/sessions', routerSession);
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

// MongoDB connect
// dbConnect();

const httpServer = app.listen(config.port, () => console.log('Running...'));
const io = new Server(httpServer);

const getProducts = () => ProductService.getProducts();
const getMessages = () => MessageService.getMessages();

io.on('connection', async (socket) => {
  console.log('New Socket');

  // Chat
  const messages = await getMessages();
  socket.emit('logs', messages);

  socket.on('message', async (newMessage) => {
    console.log(newMessage);
    const result = await MessageModel.create(newMessage);
    console.log({ result });
    const updatedMessages = await getMessages();
    io.emit('logs', updatedMessages);
  });

  // Real Time Products
  const products = await getProducts();
  socket.emit('products', products);

  socket.on('addProduct', async (product) => {
    const result = await ProductModel.create(product);
    console.log(result);
    const products = await getProducts();
    socket.emit('products', products);
  });

  socket.on('delete', async ({ confirm, productID }) => {
    if (confirm === 'Y') {
      console.log({ confirm });
      console.log({ productID });
      await ProductModel.deleteOne({ _id: productID });
      const products = await getProducts();
      socket.emit('products', products);
    } else console.log('Product not deleted');
  });
});
