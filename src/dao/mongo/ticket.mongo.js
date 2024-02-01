import TicketModel from './models/ticket.model.js';

export default class Ticket {
  getTicketById = async (id) => await TicketModel.findById(id);
  getTicketByEmail = async (email) => await TicketModel.findOne({ purchaser: email });
  createTicket = async (ticket) => await TicketModel.create({ ...ticket });
}
