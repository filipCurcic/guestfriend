import { TicketItem } from './TicketItem';
import { SortableItem } from './SortableItem';
import { type Ticket, type StatusEnum, Color } from '../types/SharedTypes';

type TicketWrapperProps = {
  ticket: Ticket;
  status: StatusEnum;
  backgroundColor: Color;
};

export const TicketWrapper = ({
  ticket,
  status,
  backgroundColor,
}: TicketWrapperProps) => (
  <SortableItem
    id={ticket.id}
    status={status}
    backgroundColor={backgroundColor}
    title={ticket.title}
  >
    <TicketItem
      title={ticket.title}
      id={ticket.id}
      backgroundColor={backgroundColor}
    />
  </SortableItem>
);
