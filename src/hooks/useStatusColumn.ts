import { useMemo } from 'react';

import { useFilteredTickets } from '../hooks/useGetFilteredTickets';

import { SortableTypeEnum, StatusEnum, Ticket } from '../types/SharedTypes';

import getStatus from '../util/getStatus';

import { useSortable } from '@dnd-kit/sortable';

export const useStatusColumn = (status: StatusEnum, tickets: Ticket[]) => {
  const filteredTickets = useFilteredTickets(tickets, status);
  const statusData = useMemo(() => getStatus(status), [status]);
  const id = `id-${status}`;

  const { setNodeRef, isOver } = useSortable({
    id,
    data: { type: SortableTypeEnum.COLUMN, status },
  });

  const numberOfTickets = filteredTickets.length;

  return {
    id,
    statusData,
    filteredTickets,
    setNodeRef,
    isOver,
    numberOfTickets,
  };
};
