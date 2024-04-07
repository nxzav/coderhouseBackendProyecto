import logger from '../logger/index.js';
import { MessageService } from '../repositories/index.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await MessageService.getMessages();
    return res.json({success: true, messages });
  } catch (error) {
    logger.error('getMessages error: ', error);
    return res.status(500).json({success: false, msg: 'Internal server error' });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const { mid } = req.params;
    const message = await MessageService.getMessageById(mid);
    if (!message)
      return res.status(404).json({ msg: `Message with id ${pid} not found` });
    return res.json({success: true, message });
  } catch (error) {
    logger.error('getMessageById error: ', error);
    return res.status(500).json({success: false, msg: 'Internal server error' });
  }
}

export const saveMessage = async (req, res) => {
  try {
    const { message, user } = req.body;
  } catch (error) {
    logger.error('saveMessage error: ', error);
    return res.status(500).json({ success: false, msg: 'Internal server error' });
  }
};
