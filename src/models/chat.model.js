import { Schema, model } from "mongoose";

const messageCollection = 'messages';
const messageSchema = new Schema({
  user: String,
  message: String,
});

const MessageModel = model(messageCollection, messageSchema);
export default MessageModel;