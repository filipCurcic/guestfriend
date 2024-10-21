import { useState } from 'react';
import {
  DndContextProps,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { type ActiveItem, StatusEnum } from '../types/SharedTypes';
import { useTicketContext } from '../context/TicketContext';

export const useDragAndDrop = (
  delay: number,
  tolerance: number
): {
  activeItem: ActiveItem | undefined;
  sensors: DndContextProps['sensors'];
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
} => {
  const [activeItem, setActiveItem] = useState<ActiveItem>();
  const { updateTicket } = useTicketContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay,
        tolerance,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    const currentData = active.data.current;
    setActiveItem({
      id: id as string,
      title: currentData?.title,
      backgroundColor: currentData?.backgroundColor,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeStatus = active?.data?.current?.status;
    const overStatus = over?.data?.current?.status;
    if (activeStatus === overStatus) return;
    updateTicket(active.id as string, {
      status: overStatus as StatusEnum,
    });
  };

  return { activeItem, sensors, handleDragStart, handleDragEnd };
};
