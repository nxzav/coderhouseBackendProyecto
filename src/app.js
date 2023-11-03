import express from 'express';
import routerViews from './routes/views.router.js';
import routerProducts from './routes/products.router.js';
import routerCarts from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import ProductManager from './models/product.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', routerViews);
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
const io = new Server(httpServer);

const p = new ProductManager();

io.on('connection', (socket) => {
  console.log('New socket');

  socket.emit('products', p.getProducts());

  socket.on('products', ({productID, confirm}) => {
    if (confirm === 'Y') {
      console.log(`Product ${Number(productID)} deleted`);
      p.deleteProduct(Number(productID));
      socket.emit('products', p.getProducts());
    } else {
      console.log(`Product ${productID} not deleted`);
      socket.emit('products', p.getProducts());
    }
  });

  socket.on('addProduct', data => {
    const { title, description, code, price, status, stock, category, thumbnails } = data;
    const result = p.addProduct(title, description, code, price, status, stock, category, thumbnails);
    console.log(result);
    JSON.stringify(result);
    socket.emit('products', p.getProducts());
  });
});