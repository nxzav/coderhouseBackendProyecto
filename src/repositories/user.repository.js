export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers = async () => this.dao.getUsers();
  getUserById = async (id) => this.dao.getUserById(id);
  register = async (user) => this.dao.saveUser(user);
}
