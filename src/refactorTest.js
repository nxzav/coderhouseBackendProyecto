import express from 'express';
import { productRouter, cartRouter, authRouter, loggerRouter } from './routes/index.js';
import logger, { addLogger } from './logger/index.js';
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(addLogger);

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/loggerTest', loggerRouter);

app.listen(8080, () => logger.info('Running...'));
