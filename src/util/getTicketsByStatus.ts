import { StatusEnum, type Ticket } from '../types/SharedTypes';

const getTicketsByStatus = (tickets: Ticket[], status: StatusEnum) => {
  return tickets.filter((ticket) => ticket.status === status);
};
export default getTicketsByStatus;
