import { Stack } from './common/Stack';
import { ColumnHeader } from './ColumnHeader';
import { TicketsContainer } from './TicketsContainer';

import { StatusEnum, type Ticket } from '../types/SharedTypes';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { useStatusColumn } from '../hooks/useStatusColumn';

type StatusColumnProps = {
  status: StatusEnum;
  tickets: Ticket[];
};

export const StatusColumn = ({ status, tickets }: StatusColumnProps) => {
  const {
    id,
    statusData,
    filteredTickets,
    setNodeRef,
    isOver,
    numberOfTickets,
  } = useStatusColumn(status, tickets);

  const { headerColor, title } = statusData;

  return (
    <SortableContext
      items={filteredTickets}
      strategy={verticalListSortingStrategy}
      id={id}
    >
      <Stack vertical gap="small-xs" css={{ flexBasis: '100%' }}>
        <ColumnHeader
          backgroundColor={headerColor}
          title={title}
          status={status}
          numberOfTickets={numberOfTickets}
        />
        <TicketsContainer
          statusData={statusData}
          tickets={filteredTickets}
          ref={setNodeRef}
          status={status}
          isOver={isOver}
        />
      </Stack>
    </SortableContext>
  );
};
