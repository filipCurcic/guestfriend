import { useMemo } from 'react';
import { StatusEnum, type Ticket } from '../types/SharedTypes';
import getTicketsByStatus from '../util/getTicketsByStatus';

export const useFilteredTickets = (tickets: Ticket[], status: StatusEnum) =>
  useMemo(() => getTicketsByStatus(tickets, status), [tickets, status]);
