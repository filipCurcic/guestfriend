import { Stack } from './common/Stack';
import { StatusColumn } from './StatusColumn';
import { TicketItem } from './TicketItem';

import { useTicketContext } from '../context/TicketContext';

import { type ActiveItem, type Color, StatusEnum } from '../types/SharedTypes';
import { DragOverlay } from '@dnd-kit/core';

type BoardProps = {
  activeItem?: ActiveItem;
};

export const Board = ({ activeItem }: BoardProps) => {
  const { tickets } = useTicketContext();

  return (
    <Stack horizontal gap={'small-xs'}>
      <StatusColumn status={StatusEnum.TO_DO} tickets={tickets} />
      <StatusColumn status={StatusEnum.IN_PROGRESS} tickets={tickets} />
      <StatusColumn status={StatusEnum.DONE} tickets={tickets} />
      <DragOverlay
        dropAnimation={{
          duration: 15,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}
      >
        {activeItem ? (
          <TicketItem
            id={activeItem.id}
            backgroundColor={activeItem.backgroundColor as Color}
            title={activeItem.title}
          />
        ) : null}
      </DragOverlay>
    </Stack>
  );
};
