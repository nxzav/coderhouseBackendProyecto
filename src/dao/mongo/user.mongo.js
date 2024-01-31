import UserModel from './models/user.model.js';

export default class User {
  getUsers = async () => UserModel.find();
  getUserById = async (id) => UserModel.findById(id);
  getUserByEmail = async (email) => UserModel.findOne({ email });
  registerUser = async (user) => UserModel.create({ ...user });
}
