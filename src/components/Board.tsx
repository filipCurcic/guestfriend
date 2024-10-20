import { Stack } from './common/Stack';
import { StatusColumn } from './StatusColumn';

import { StatusEnum } from '../types/SharedTypes';

export const Board = () => {
  return (
    <Stack horizontal gap={'small-xs'}>
      <StatusColumn status={StatusEnum.TO_DO} tickets={[]} />
      <StatusColumn status={StatusEnum.IN_PROGRESS} tickets={[]} />
      <StatusColumn status={StatusEnum.DONE} tickets={[]} />
    </Stack>
  );
};
