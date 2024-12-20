import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
} from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

import {
    Column,
    LocalStorageKeysEnum,
    StatusEnum,
    type Ticket,
} from '../types/SharedTypes'

import { Active, Over } from '@dnd-kit/core'

type TicketContextType = {
    tickets: Record<string, Ticket>
    columns: Column
    addTicket: (ticketContent: string, category: StatusEnum, id: string) => void
    removeTicket: (ticketId: string, status: StatusEnum) => void
    updateTicket: (
        ticketId: string,
        updatedContent: Partial<Omit<Ticket, 'id'>>
    ) => void
    moveTicket: (activeItem: Active, overItem: Over) => void
}

const INITIAL_COLUMNS = {
    [StatusEnum.TO_DO]: {
        id: StatusEnum.TO_DO,
        ticketIds: [],
    },
    [StatusEnum.IN_PROGRESS]: {
        id: StatusEnum.IN_PROGRESS,
        ticketIds: [],
    },
    [StatusEnum.DONE]: {
        id: StatusEnum.DONE,
        ticketIds: [],
    },
}

export const TicketContext = createContext<TicketContextType | null>(null)

export const useTicketContext = () => {
    const context = useContext(TicketContext)
    if (!context) {
        throw new Error(
            'useTicketContext must be used within a TicketContextProvider'
        )
    }
    return context
}

type TicketContextProviderProps = {
    children: ReactNode
}

export const TicketContextProvider: FC<TicketContextProviderProps> = ({
    children,
}) => {
    const [tickets, setTickets] = useLocalStorage<Record<string, Ticket>>(
        LocalStorageKeysEnum.TICKETS,
        {}
    )
    const [columns, setColumns] = useLocalStorage(
        LocalStorageKeysEnum.COLUMNS,
        INITIAL_COLUMNS
    )

    const addTicket = useCallback(
        (content: string, status: StatusEnum, ticketId: string) => {
            const newTicket: Ticket = {
                id: ticketId,
                content,
                status,
            }
            setTickets((prevTickets) => ({
                ...prevTickets,
                [ticketId]: newTicket,
            }))
            setColumns((prevColumns) => ({
                ...prevColumns,
                [status]: {
                    ...prevColumns[status],
                    ticketIds: [...prevColumns[status].ticketIds, ticketId],
                },
            }))
        },
        [setColumns, setTickets]
    )

    const removeTicket = useCallback(
        (ticketId: string, status: StatusEnum) => {
            setTickets((prevTickets) => {
                const newTickets = { ...prevTickets }
                delete newTickets[ticketId]
                return newTickets
            })
            setColumns((prevColumns) => ({
                ...prevColumns,
                [status]: {
                    ...prevColumns[status],
                    ticketIds: prevColumns[status].ticketIds.filter(
                        (id) => id !== ticketId
                    ),
                },
            }))
        },
        [setColumns, setTickets]
    )

    const updateTicket = useCallback(
        (ticketId: string, updatedContent: Partial<Omit<Ticket, 'id'>>) => {
            setTickets((prev) => {
                const ticket = prev[ticketId]
                if (!ticket) return prev
                return {
                    ...prev,
                    [ticketId]: {
                        ...ticket,
                        ...updatedContent,
                    },
                }
            })
        },
        [setTickets]
    )

    const moveTicket = useCallback(
        (activeItem: Active, overItem: Over) => {
            const activeDataStatus = activeItem.data?.current
                ?.status as StatusEnum
            const activeIndex = activeItem.data?.current?.sortable
                .index as number

            const overDataStatus = overItem.data?.current?.status as StatusEnum
            const overIndex = overItem.data?.current?.sortable.index as number

            const isTheSameColumn = activeDataStatus === overDataStatus

            setColumns((prev) => {
                if (isTheSameColumn) {
                    const ticketIds = [...prev[activeDataStatus].ticketIds]
                    const [movedElement] = ticketIds.splice(activeIndex, 1)
                    ticketIds.splice(overIndex, 0, movedElement)
                    return {
                        ...prev,
                        [activeDataStatus]: {
                            ...prev[activeDataStatus],
                            ticketIds,
                        },
                    }
                }
                const activeTicketIds = [...prev[activeDataStatus].ticketIds]
                const overTicketIds = [...prev[overDataStatus].ticketIds]

                const [movedTicket] = activeTicketIds.splice(activeIndex, 1)

                if (overIndex === -1 && activeDataStatus !== overDataStatus) {
                    overTicketIds.push(movedTicket)
                } else {
                    overTicketIds.splice(overIndex, 0, movedTicket)
                }

                return {
                    ...prev,
                    [activeDataStatus]: {
                        ...prev[activeDataStatus],
                        ticketIds: activeTicketIds,
                    },
                    [overDataStatus]: {
                        ...prev[overDataStatus],
                        ticketIds: overTicketIds,
                    },
                }
            })
        },
        [setColumns]
    )

    const contextValue = useMemo(
        () => ({
            tickets,
            addTicket,
            removeTicket,
            updateTicket,
            columns,
            moveTicket,
        }),
        [tickets, addTicket, removeTicket, updateTicket, columns, moveTicket]
    )

    return (
        <TicketContext.Provider value={contextValue}>
            {children}
        </TicketContext.Provider>
    )
}
