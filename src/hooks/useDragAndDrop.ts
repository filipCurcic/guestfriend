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
import { type ActiveItem } from '../types/SharedTypes';
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
  const { moveTicket } = useTicketContext();

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
      content: currentData?.content,
      backgroundColor: currentData?.backgroundColor,
      status: currentData?.status,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    moveTicket(active, over);
  };

  return { activeItem, sensors, handleDragStart, handleDragEnd };
};
