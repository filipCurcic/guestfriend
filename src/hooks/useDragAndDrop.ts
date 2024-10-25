import { useState } from 'react'
import {
    DndContextProps,
    DragEndEvent,
    DragStartEvent,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { PointerSensor } from '@dnd-kit/core'
import { type ActiveItem } from '../types/SharedTypes'
import { useTicketContext } from '../context/TicketContext'

/**
 * __useDragAndDrop__
 *
 * dnd-kit setup hook
 *
 * @param delay delays the drag activation
 * @param tolerance tolerance for the activation
 * @returns activeItem, drag and drop sensors, dragStart and dragEnd event handling functions
 *
 * @example
 * const { activeItem, sensors, handleDragStart, handleDragEnd } = useDragAndDrop(100, 5);
 *
 *
 */

export const useDragAndDrop = (
    delay: number,
    tolerance: number
): {
    activeItem: ActiveItem | undefined
    sensors: DndContextProps['sensors']
    handleDragStart: (event: DragStartEvent) => void
    handleDragEnd: (event: DragEndEvent) => void
} => {
    const [activeItem, setActiveItem] = useState<ActiveItem>()
    const { moveTicket } = useTicketContext()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay,
                tolerance,
            },
        })
    )

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        const { id } = active
        const currentData = active.data.current
        setActiveItem({
            id: id as string,
            content: currentData?.content,
            backgroundColor: currentData?.backgroundColor,
            status: currentData?.status,
        })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return
        moveTicket(active, over)
    }

    return { activeItem, sensors, handleDragStart, handleDragEnd }
}
