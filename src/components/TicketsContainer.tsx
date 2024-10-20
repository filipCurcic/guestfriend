import { Stack } from './common/Stack';
import { TicketItem } from './TicketItem';

import { type Ticket, type Status } from '../types/SharedTypes';

import { useTokens } from '../theme/tokens';

type TicketsContainerProps = {
  statusData: Status;
  tickets: Ticket[];
};

export const TicketsContainer = ({
  statusData,
  tickets,
}: TicketsContainerProps) => {
  const tokens = useTokens();

  return (
    <Stack
      vertical
      css={{
        width: '100%',
        backgroundColor: tokens.colors[statusData.containerColor],
        minHeight: '450px',
      }}
      align="center"
      padding="small-lg"
      gap="small-lg"
    >
      {tickets.map((ticket) => (
        <TicketItem
          title={ticket.title}
          id={ticket.id}
          key={ticket.id}
          backgroundColor={statusData.ticketColor}
        />
      ))}
    </Stack>
  );
};
