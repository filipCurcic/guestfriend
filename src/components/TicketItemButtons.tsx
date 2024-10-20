import { tokens } from '../theme/base';
import { Button } from './common/Button';

type TicketItemButtonsProps = {
  isEditing?: boolean;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onEdit?: () => void;
};

export const TicketItemButtons = ({
  isEditing,
  onDelete,
  onEdit,
}: TicketItemButtonsProps) => {
  return (
    <Button
      onClick={isEditing ? onEdit : onDelete}
      aria-label={isEditing ? 'Save changes' : 'Delete ticket'}
      css={{
        position: 'absolute',
        top: tokens.space['small-xxs'],
        right: tokens.space['small-xxs'],
      }}
    >
      {isEditing ? <>&#x2713;</> : 'x'}
    </Button>
  );
};
