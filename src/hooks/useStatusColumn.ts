import { useMemo } from 'react';

import { SortableTypeEnum, StatusEnum } from '../types/SharedTypes';

import getStatus from '../util/getStatus';

import { useSortable } from '@dnd-kit/sortable';

export const useStatusColumn = (status: StatusEnum) => {
  const statusData = useMemo(() => getStatus(status), [status]);

  const { setNodeRef, isOver } = useSortable({
    id: status,
    data: { type: SortableTypeEnum.COLUMN, status },
  });

  return {
    statusData,
    setNodeRef,
    isOver,
  };
};
