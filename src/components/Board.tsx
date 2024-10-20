import { Stack } from './common/Stack';
import { StatusColumn } from './StatusColumn';

import { useTicketContext } from '../context/TicketContext';

import { StatusEnum } from '../types/SharedTypes';

export const Board = () => {
  const { tickets } = useTicketContext();

  return (
    <Stack horizontal gap={'small-xs'}>
      <StatusColumn status={StatusEnum.TO_DO} tickets={tickets} />
      <StatusColumn status={StatusEnum.IN_PROGRESS} tickets={tickets} />
      <StatusColumn status={StatusEnum.DONE} tickets={tickets} />
    </Stack>
  );
};
