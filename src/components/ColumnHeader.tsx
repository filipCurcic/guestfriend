import { Button } from './common/Button';
import { Stack } from './common/Stack';
import { Typography } from './common/Typography';

import { StatusEnum } from '../types/SharedTypes';

import { Tokens, useTokens } from '../theme/tokens';

import { useTicketContext } from '../context/TicketContext';
import { mapResponsiveValues } from '../responsive/mapResponsiveValues';

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
      css={{
        backgroundColor: tokens.colors[backgroundColor],
      }}
      padding="small-sm"
    >
      <Stack horizontal align="center">
        <Typography
          size="large-sm"
          css={[
            {
              flexGrow: 1,
              textAlign: 'center',
            },
            mapResponsiveValues({
              sm: { fontSize: `${tokens.size['small-md']}` },
              md: { fontSize: `${tokens.size['large-xs']}` },
              lg: { fontSize: `${tokens.size['large-sm']}` },
            }),
          ]}
          as="h5"
        >
          {title}
        </Typography>
        <Button
          css={mapResponsiveValues({
            sm: { fontSize: `${tokens.size['large-xs']}` },
            md: { fontSize: `${tokens.size['large-md']}` },
            lg: { fontSize: `${tokens.size['large-lg']}` },
          })}
          onClick={handleNewTicket}
        >
          +
        </Button>
      </Stack>
      <Stack center>({numberOfTickets})</Stack>
    </Stack>
  );
};
