import { FC, forwardRef } from 'react';

import { Stack } from './common/Stack';

import { useTokens } from '../theme/tokens';

import { type Ticket, StatusEnum, Color } from '../types/SharedTypes';
import { TicketItem } from './TicketItem';

type TicketsContainerProps = {
  status: StatusEnum;
  tickets: Ticket[];
  isOver: boolean;
  ticketColor: Color;
  containerColor: Color;
};

export const TicketsContainer: FC<TicketsContainerProps> = forwardRef<
  HTMLDivElement,
  TicketsContainerProps
>(({ ticketColor, containerColor, tickets, status, isOver }, ref) => {
  const tokens = useTokens();

  return (
    <Stack
      ref={ref}
      vertical
      css={{
        width: '100%',
        backgroundColor: tokens.colors[containerColor],
        minHeight: '450px',
        maxHeight: '450px',
        outline: isOver ? `solid ${tokens.colors.gray400}` : 'none',
        overflowY: 'scroll',
      }}
      align="center"
      padding="small-lg"
      gap="small-lg"
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
    </Stack>
  );
});
