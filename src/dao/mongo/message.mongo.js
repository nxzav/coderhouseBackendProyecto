import MessageModel from './models/message.model.js';

export default class Message {
  getMessages = async () => MessageModel.find();
  getMessageById = async (id) => MessageModel.findById(id);
  saveMessage = async (message) => MessageModel.create(message);
}