import { FC } from 'react'
import { Stack } from '../common/Stack'

import { TicketsContainer } from '../Ticket/TicketsContainer'
import { ColumnHeader } from '../ColumnHeader/ColumnHeader'

import { StatusEnum, type Ticket } from '../../types/SharedTypes'

import { useStatusColumn } from '../../hooks/useStatusColumn'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type StatusColumnProps = {
    status: StatusEnum
    tickets: Ticket[]
}

/**
 * __StatusColumn__
 *
 * @component
 * Component that renders a column with a header and a list of draggable tickets
 *
 * @param status status of the column
 * @param tickets array of tickets
 *
 */

export const StatusColumn: FC<StatusColumnProps> = ({ status, tickets }) => {
    const { filteredTickets, statusData, setNodeRef, isOver } = useStatusColumn(
        status,
        tickets
    )

    const { headerColor, title, ticketColor, containerColor } = statusData

    const numberOfTickets = filteredTickets.length

    return (
        <SortableContext
            items={tickets}
            strategy={verticalListSortingStrategy}
            id={status}
        >
            <Stack
                direction="vertical"
                gap="small-xs"
                css={{ flexBasis: '100%' }}
                ref={setNodeRef}
                data-testid={`column-${status}`}
            >
                <ColumnHeader
                    backgroundColor={headerColor}
                    title={title}
                    status={status}
                    numberOfTickets={numberOfTickets}
                />
                <TicketsContainer
                    ticketColor={ticketColor}
                    containerColor={containerColor}
                    tickets={filteredTickets}
                    status={status}
                    isOver={isOver}
                />
            </Stack>
        </SortableContext>
    )
}
