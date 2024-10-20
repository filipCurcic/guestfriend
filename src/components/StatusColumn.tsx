import { Stack } from './common/Stack';
import { ColumnHeader } from './ColumnHeader';
import { TicketsContainer } from './TicketsContainer';

import { StatusEnum, type Ticket } from '../types/SharedTypes';

import getStatus from '../util/getStatus';

type StatusColumnProps = {
  status: StatusEnum;
  isOver?: boolean;
  tickets: Ticket[];
};

export const StatusColumn = ({
  status,
  isOver,
  tickets,
}: StatusColumnProps) => {
  const statusData = getStatus(status);
  return (
    <Stack
      vertical
      gap="small-xs"
      css={{ flexBasis: '100%', border: isOver ? '1px solid black' : 'none' }}
    >
      <ColumnHeader
        backgroundColor={statusData.headerColor}
        title={statusData.title + isOver}
        status={status}
      />
      <TicketsContainer statusData={statusData} tickets={tickets} />
    </Stack>
  );
};
