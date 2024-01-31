export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers = async () => this.dao.getUsers();
  getUserById = async (id) => this.dao.getUserById(id);
  getUserByEmail = async (email) => this.dao.getUserByEmail(email);
  registerUser = async (user) => this.dao.registerUser(user);
}
