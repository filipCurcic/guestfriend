import { Button } from './common/Button';
import { Stack } from './common/Stack';
import { Typography } from './common/Typography';

import { StatusEnum } from '../types/SharedTypes';

import { Tokens, useTokens } from '../theme/tokens';

import { useTicketContext } from '../context/TicketContext';

type ColumnHeaderProps = {
  title: string;
  backgroundColor: keyof Tokens['colors'];
  status: StatusEnum;
  numberOfTickets: number;
};
export const ColumnHeader = ({
  title,
  status,
  backgroundColor,
  numberOfTickets,
}: ColumnHeaderProps) => {
  const { addTicket } = useTicketContext();
  const tokens = useTokens();

  const handleNewTicket = () => {
    addTicket(`New ${status} Ticket`, status, crypto.randomUUID());
  };

  return (
    <Stack
      vertical
      style={{
        backgroundColor: tokens.colors[backgroundColor],
      }}
      padding="small-sm"
    >
      <Stack horizontal align="center">
        <Typography
          size="large-sm"
          style={{
            flexGrow: 1,
            textAlign: 'center',
          }}
          as="h5"
        >
          {title}
        </Typography>
        <Button css={{ fontSize: '25px' }} onClick={handleNewTicket}>
          +
        </Button>
      </Stack>
      <Stack center>({numberOfTickets})</Stack>
    </Stack>
  );
};
