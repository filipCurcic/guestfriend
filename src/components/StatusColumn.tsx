import { FC } from 'react';
import { Stack } from './common/Stack';
import { ColumnHeader } from './ColumnHeader';
import { TicketsContainer } from './TicketsContainer';

import { StatusEnum, type Ticket } from '../types/SharedTypes';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useStatusColumn } from '../hooks/useStatusColumn';
import { useSearchContext } from '../context/SearchContext';

type StatusColumnProps = {
  status: StatusEnum;
  tickets: Ticket[];
};

export const StatusColumn: FC<StatusColumnProps> = ({ status, tickets }) => {
  const { statusData, setNodeRef, isOver } = useStatusColumn(status);
  const { searchTerm } = useSearchContext();

  const { headerColor, title } = statusData;

  const filteredTickets = tickets.filter((ticket) =>
    ticket.content.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const numberOfTickets = tickets.length;

  return (
    <SortableContext
      items={tickets}
      strategy={verticalListSortingStrategy}
      id={status}
    >
      <Stack
        vertical
        gap="small-xs"
        css={{ flexBasis: '100%' }}
        ref={setNodeRef}
      >
        <ColumnHeader
          backgroundColor={headerColor}
          title={title}
          status={status}
          numberOfTickets={numberOfTickets}
        />
        <TicketsContainer
          ticketColor={statusData.ticketColor}
          containerColor={statusData.containerColor}
          tickets={filteredTickets}
          status={status}
          isOver={isOver}
        />
      </Stack>
    </SortableContext>
  );
};
