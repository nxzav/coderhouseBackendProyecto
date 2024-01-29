import UserModel from './models/user.model.js';

export default class User {
  getUsers = async () => UserModel.find();
  getUserById = async (id) => UserModel.findById(id);
  saveUser = async (user) => UserModel.create(user);
}
