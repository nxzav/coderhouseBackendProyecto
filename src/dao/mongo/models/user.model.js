import mongoose from 'mongoose';

const UserModel = mongoose.model('users', new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: { type: String, default: 'user', enum: ['user', 'admin', 'premium'] },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  status: { type: Boolean, default: true },
  creationDate: { type: Date, default: Date.now },
}));

export default UserModel;
