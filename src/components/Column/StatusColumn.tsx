import { FC } from 'react';
import { Stack } from '../common/Stack';

import { TicketsContainer } from '../Ticket/TicketsContainer';
import { ColumnHeader } from '../ColumnHeader/ColumnHeader';

import { StatusEnum, type Ticket } from '../../types/SharedTypes';

import { useStatusColumn } from '../../hooks/useStatusColumn';
import { useSearchContext } from '../../context/SearchContext';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type StatusColumnProps = {
  status: StatusEnum;
  tickets: Ticket[];
};

export const StatusColumn: FC<StatusColumnProps> = ({ status, tickets }) => {
  const { statusData, setNodeRef, isOver } = useStatusColumn(status);
  const { searchTerm } = useSearchContext();

  const { headerColor, title, ticketColor, containerColor } = statusData;

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
        direction="vertical"
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
          ticketColor={ticketColor}
          containerColor={containerColor}
          tickets={filteredTickets}
          status={status}
          isOver={isOver}
        />
      </Stack>
    </SortableContext>
  );
};
