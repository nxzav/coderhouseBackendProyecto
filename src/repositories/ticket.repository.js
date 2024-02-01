export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getTicketById = async (id) => this.dao.getTicketById(id);
  getTicketByEmail = async (email) => await this.dao.getTicketByEmail(email);
  createTicket = async (ticket) => await this.dao.createTicket(ticket);
}
