import { Schema, model } from 'mongoose';

const userCollection = 'users';
const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  status: { type: Boolean, default: true },
  creationDate: { type: Date, default: Date.now },
});

const UserModel = model(userCollection, userSchema);
export default UserModel;
