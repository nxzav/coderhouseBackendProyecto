import mongoose from 'mongoose';

const MessageModel = mongoose.model('messages', new mongoose.Schema({
  user: String,
  message: String,
}));

export default MessageModel;
