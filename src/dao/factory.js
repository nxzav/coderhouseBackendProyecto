import config from '../config/config.js';
import mongoose from 'mongoose';

export let User;
export let Product;
export let Cart;
export let Message;

console.log(`Persistence with ${config.persistence}`);

switch (config.persistence) {
  case 'MONGO':
    await mongoose.connect(config.mongoURI, { dbName: config.mongoDBName });
    console.log('DB connected');

    const { default: UserMongo } = await import('./mongo/user.mongo.js');
    const { default: ProductMongo } = await import('./mongo/product.mongo.js');
    const { default: CartMongo } = await import('./mongo/cart.mongo.js');
    const { default: MessageMongo } = await import('./mongo/message.mongo.js');

    User = UserMongo;
    Product = ProductMongo;
    Cart = CartMongo;
    Message = MessageMongo;

    break;

  default:
    throw new Error('Persistence not set');
}
