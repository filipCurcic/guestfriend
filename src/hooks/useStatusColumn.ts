import { useMemo } from 'react'

import { SortableTypeEnum, StatusEnum, Ticket } from '../types/SharedTypes'

import getStatus from '../util/getStatus'

import { useSortable } from '@dnd-kit/sortable'
import { useSearchContext } from '../context/SearchContext'

export const useStatusColumn = (status: StatusEnum, tickets: Ticket[]) => {
    const { searchTerm } = useSearchContext()
    const statusData = useMemo(() => getStatus(status), [status])

    const { setNodeRef, isOver } = useSortable({
        id: status,
        data: { type: SortableTypeEnum.COLUMN, status },
    })

    const filteredTickets = useMemo(
        () =>
            tickets.filter((ticket) =>
                ticket.content
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase().trim())
            ),
        [searchTerm, tickets]
    )

    return {
        filteredTickets,
        statusData,
        setNodeRef,
        isOver,
    }
}
