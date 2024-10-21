import { forwardRef } from 'react';

import { Stack } from './common/Stack';

import { useTokens } from '../theme/tokens';

import { type Ticket, type Status, StatusEnum } from '../types/SharedTypes';
import { TicketWrapper } from './TicketWrapper';

type TicketsContainerProps = {
  statusData: Status;
  status: StatusEnum;
  tickets: Ticket[];
  isOver: boolean;
};

export const TicketsContainer = forwardRef<
  HTMLDivElement,
  TicketsContainerProps
>(({ statusData, tickets, status, isOver }: TicketsContainerProps, ref) => {
  const tokens = useTokens();

  return (
    <Stack
      ref={ref}
      vertical
      css={{
        width: '100%',
        backgroundColor: tokens.colors[statusData.containerColor],
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
        <TicketWrapper
          key={ticket.id}
          ticket={ticket}
          status={status}
          backgroundColor={statusData.ticketColor}
        />
      ))}
    </Stack>
  );
});
