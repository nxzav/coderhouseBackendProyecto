import mongoose from 'mongoose';

const UserModel = mongoose.model(
  'users',
  new mongoose.Schema({
    first_name: { type: String, required: [true, 'First name is required'] },
    last_name: { type: String, required: [true, 'Last name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: [true, 'Password is required'] },
    age: { type: Number },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'premium'],
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carts',
      required: true,
    },
    status: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now },
  })
);

export default UserModel;
