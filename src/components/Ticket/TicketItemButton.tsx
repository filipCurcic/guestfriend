import { FC } from 'react';

import { Button } from '../common/Button';

import { tokens } from '../../theme/base';

type TicketItemButtonsProps = {
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TicketItemButton: FC<TicketItemButtonsProps> = ({ onDelete }) => {
  return (
    <Button
      onClick={onDelete}
      aria-label={'Delete ticket'}
      css={{
        position: 'absolute',
        top: tokens.space['small-sm'],
        right: tokens.space['small-xs'],
      }}
    >
      X
    </Button>
  );
};
