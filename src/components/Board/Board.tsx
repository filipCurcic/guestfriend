import { Stack } from './../common/Stack'
import { StatusColumn } from '../Column/StatusColumn'
import { TicketItem } from './../Ticket/TicketItem'

import { useTicketContext } from '../../context/TicketContext'

import {
    type ActiveItem,
    type Color,
    StatusEnum,
} from '../../types/SharedTypes'
import { DragOverlay } from '@dnd-kit/core'
import { FC } from 'react'

type BoardProps = {
    activeItem?: ActiveItem
}

/**
 * __Board__
 *
 * @component
 * Component that renders the board with N amount of columns and a header with a title and a search bar
 *
 * @param activeItem currently dragged item
 *
 */
export const Board: FC<BoardProps> = ({ activeItem }) => {
    const { tickets, columns } = useTicketContext()
    return (
        <Stack direction="horizontal" gap={'small-xs'}>
            {Object.keys(columns).map((column) => (
                <StatusColumn
                    status={column as StatusEnum}
                    key={column}
                    tickets={columns[column as StatusEnum].ticketIds.map(
                        (ticketId) => tickets[ticketId]
                    )}
                />
            ))}
            <DragOverlay
                dropAnimation={{
                    duration: 15,
                    easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
                }}
            >
                {activeItem ? (
                    <TicketItem
                        id={activeItem.id}
                        backgroundColor={activeItem.backgroundColor as Color}
                        content={activeItem.content}
                        status={activeItem.status}
                    />
                ) : null}
            </DragOverlay>
        </Stack>
    )
}
