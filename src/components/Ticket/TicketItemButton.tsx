import { FC } from 'react';

import { StyledTicketButton } from '../../ui/Ticket';

type TicketItemButtonsProps = {
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TicketItemButton: FC<TicketItemButtonsProps> = ({ onDelete }) => {
  return (
    <StyledTicketButton onClick={onDelete} aria-label={'Delete ticket'}>
      X
    </StyledTicketButton>
  );
};
