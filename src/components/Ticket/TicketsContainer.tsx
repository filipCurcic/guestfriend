import { FC } from 'react';

import { TicketItem } from './TicketItem';

import { type Ticket, StatusEnum, Color } from '../../types/SharedTypes';
import { StyledTicketsContainer } from '../../ui/Ticket';

type TicketsContainerProps = {
  status: StatusEnum;
  tickets: Ticket[];
  isOver: boolean;
  ticketColor: Color;
  containerColor: Color;
};

export const TicketsContainer: FC<TicketsContainerProps> = ({
  ticketColor,
  containerColor,
  tickets,
  status,
  isOver,
}) => {
  return (
    <StyledTicketsContainer
      direction="vertical"
      containerColor={containerColor}
      isOver={isOver}
      align="center"
      gap="small-lg"
      aria-live="polite"
      role="list"
    >
      {tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          content={ticket.content}
          id={ticket.id}
          backgroundColor={ticketColor}
          status={status}
        />
      ))}
    </StyledTicketsContainer>
  );
};
