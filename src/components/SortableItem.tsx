import { PropsWithChildren } from 'react';

import { TicketItemProps } from './TicketItem';

import { SortableTypeEnum, StatusEnum } from '../types/SharedTypes';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = PropsWithChildren<
  TicketItemProps & { status: StatusEnum }
>;

export function SortableItem({
  id,
  status,
  backgroundColor,
  title,
  children,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: { type: SortableTypeEnum.TICKET, status, title, backgroundColor },
    });

  const css = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '70%',
  };

  return (
    <div ref={setNodeRef} css={css} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
