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
        position: 'relative',
        backgroundColor: tokens.colors[backgroundColor],
      }}
      padding="small-sm"
    >
      <Stack align="center">
        <Typography
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
          as="h2"
          aria-label={title}
        >
          {title}
        </Typography>
        <Button
          css={[
            { position: 'absolute' },
            mapResponsiveValues({
              sm: {
                fontSize: `${tokens.size['large-xs']}`,
                right: 0,
              },
              md: { fontSize: `${tokens.size['large-md']}`, right: 0 },
              lg: {
                fontSize: `${tokens.size['large-md']}`,
                right: tokens.space['small-sm'],
              },
            }),
          ]}
          onClick={handleNewTicket}
          aria-label="Add new ticket"
        >
          +
        </Button>
      </Stack>
      <Stack
        aria-live="polite"
        center
        css={mapResponsiveValues({
          sm: { fontSize: `${tokens.size['small-md']}` },
          md: { fontSize: `${tokens.size['small-lg']}` },
          lg: { fontSize: `${tokens.size['large-xs']}` },
        })}
      >
        ({numberOfTickets})
      </Stack>
    </Stack>
  );
};
