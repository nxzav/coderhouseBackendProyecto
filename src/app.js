import express from 'express';
import routerProducts from './routes/products.router.js';
import routerCarts from './routes/carts.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/static', express.static('src/public'));

app.get('/', (req, res) => res.send({status: 'Ok'}));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);



app.listen(port, () => console.log(`Running on port ${port}`));