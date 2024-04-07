export default class MessageRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getMessages = async () => this.dao.getMessages();
  getMessageById = async (id) => this.dao.getMessageById(id);
  saveMessage = async (message) => this.dao.saveMessage(message);
}
