import { useMemo } from 'react';

import { Stack } from './common/Stack';
import { ColumnHeader } from './ColumnHeader';
import { TicketsContainer } from './TicketsContainer';

import { useFilteredTickets } from '../hooks/useGetFilteredTickets';

import { StatusEnum, type Ticket } from '../types/SharedTypes';

import getStatus from '../util/getStatus';

type StatusColumnProps = {
  status: StatusEnum;
  tickets: Ticket[];
};

export const StatusColumn = ({ status, tickets }: StatusColumnProps) => {
  const filteredTickets = useFilteredTickets(tickets, status);
  const statusData = useMemo(() => getStatus(status), [status]);

  const { headerColor, title } = statusData;

  const numberOfTickets = filteredTickets.length;

  return (
    <Stack vertical gap="small-xs" css={{ flexBasis: '100%' }}>
      <ColumnHeader
        backgroundColor={headerColor}
        title={title}
        status={status}
        numberOfTickets={numberOfTickets}
      />
      <TicketsContainer statusData={statusData} tickets={filteredTickets} />
    </Stack>
  );
};
