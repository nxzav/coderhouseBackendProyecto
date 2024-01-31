import express from 'express';
import { productRouter, cartRouter, authRouter } from './routes/index.js';
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, () => console.log('Running...'));
