import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
// import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
// Utils config
import __dirname from './utils.js';
// import initializePassport from './config/passport.config.js';
// Routes
import viewsRouter from './routes/views.router.js';
import { productRouter, cartRouter, authRouter, loggerRouter } from './routes/index.js';
// Services
import { ProductService, MessageService } from './repositories/index.js';
// Logger
import logger from './logger/index.js';
// Initialize express
const app = express();
// Config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
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
// initializePassport();
// app.use(passport.initialize());
// app.use(passport.session());

// App routing
// app.use('/api/sessions', routerSession);
app.use('/', viewsRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/loggerTest', loggerRouter);

// MongoDB connect
// dbConnect();

const httpServer = app.listen(config.port, () => logger.info('Running...'));
const io = new Server(httpServer);

const getProducts = () => ProductService.getAllProducts();
const getMessages = () => MessageService.getMessages();

io.on('connection', async (socket) => {
  logger.info('New Socket');

  // Chat
  const messages = await getMessages();
  socket.emit('logs', messages);

  socket.on('message', async (newMessage) => {
    logger.info(newMessage);
    const result = await MessageModel.create(newMessage);
    logger.info({ result });
    const updatedMessages = await getMessages();
    io.emit('logs', updatedMessages);
  });

  // Real Time Products
  const products = await getProducts();
  socket.emit('products', products);

  socket.on('addProduct', async (product) => {
    const result = await ProductModel.create(product);
    logger.info(result);
    const products = await getProducts();
    socket.emit('products', products);
  });

  socket.on('delete', async ({ confirm, productID }) => {
    if (confirm === 'Y') {
      logger.info({ confirm });
      logger.info({ productID });
      await ProductModel.deleteOne({ _id: productID });
      const products = await getProducts();
      socket.emit('products', products);
    } else logger.info('Product not deleted');
  });
});
