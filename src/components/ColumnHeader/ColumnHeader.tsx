import { Stack } from './../common/Stack';

import { Color, StatusEnum } from '../../types/SharedTypes';

import { useTicketContext } from '../../context/TicketContext';
import {
  StyledColumnHeader,
  StyledColumnHeaderButton,
  StyledTicketCountStack,
  StyledTitleTypography,
} from '../../ui/ColumnHeader';
import { FC } from 'react';

type ColumnHeaderProps = {
  title: string;
  backgroundColor: Color;
  status: StatusEnum;
  numberOfTickets: number;
};
export const ColumnHeader: FC<ColumnHeaderProps> = ({
  title,
  status,
  backgroundColor,
  numberOfTickets,
}) => {
  const { addTicket } = useTicketContext();

  const handleNewTicket = () => {
    addTicket(`New ${status} Ticket`, status, crypto.randomUUID());
  };

  return (
    <StyledColumnHeader direction="vertical" backgroundColor={backgroundColor}>
      <Stack align="center">
        <StyledTitleTypography as="h2" aria-label={title}>
          {title}
        </StyledTitleTypography>
        <StyledColumnHeaderButton
          onClick={handleNewTicket}
          aria-label="Add new ticket"
        >
          +
        </StyledColumnHeaderButton>
      </Stack>
      <StyledTicketCountStack aria-live="polite" center>
        ({numberOfTickets})
      </StyledTicketCountStack>
    </StyledColumnHeader>
  );
};
