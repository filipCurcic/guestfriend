import { render, RenderOptions } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from '@emotion/react'
import { DndContext } from '@dnd-kit/core'
import { StatusEnum, Ticket } from '../types/SharedTypes'
import { theme } from '../theme'
import { useStatusColumn } from '../hooks/useStatusColumn'
import { useTicketContext } from '../context/TicketContext'
import { useSearchContext } from '../context/SearchContext'

export const mockTickets: Record<string, Ticket> = {
    '1': { id: '1', content: 'Test Ticket 1', status: StatusEnum.TO_DO },
    '2': { id: '2', content: 'Test Ticket 2', status: StatusEnum.IN_PROGRESS },
}

export const mockColumns = {
    [StatusEnum.TO_DO]: {
        id: StatusEnum.TO_DO,
        ticketIds: ['1'],
    },
    [StatusEnum.IN_PROGRESS]: {
        id: StatusEnum.IN_PROGRESS,
        ticketIds: ['2'],
    },
    [StatusEnum.DONE]: {
        id: StatusEnum.DONE,
        ticketIds: [],
    },
}

export const mockStatusData = {
    headerColor: 'blue600',
    title: 'To Do',
    ticketColor: 'blue400',
    containerColor: 'blue200',
}

export const mockFilteredTickets: Ticket[] = [
    { id: '1', content: 'Test Ticket 1', status: StatusEnum.TO_DO },
    { id: '2', content: 'Test Ticket 2', status: StatusEnum.TO_DO },
]

export const setupTicketContext = (customValue = {}) => {
    const defaultValue = {
        tickets: mockTickets,
        columns: mockColumns,
        addTicket: jest.fn(),
    }

    ;(useTicketContext as jest.Mock).mockReturnValue({
        ...defaultValue,
        ...customValue,
    })
}

export const setupStatusColumnHook = (customValue = {}) => {
    const defaultValue = {
        filteredTickets: mockFilteredTickets,
        statusData: mockStatusData,
        setNodeRef: jest.fn(),
        isOver: false,
    }
    ;(useStatusColumn as jest.Mock).mockReturnValue({
        ...defaultValue,
        ...customValue,
    })
}

export const setupSearchContext = (customValue = {}) => {
    const defaultValue = {
        setSearchTerm: jest.fn(),
    }

    ;(useSearchContext as jest.Mock).mockReturnValue({
        ...defaultValue,
        ...customValue,
    })
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    withDragContext?: boolean
}

export function renderWithProviders(
    ui: React.ReactElement,
    { withDragContext = true, ...renderOptions }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
        return (
            <ThemeProvider theme={theme}>
                {withDragContext ? (
                    <DndContext onDragEnd={jest.fn()}>{children}</DndContext>
                ) : (
                    children
                )}
            </ThemeProvider>
        )
    }
    return {
        ...render(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
    }
}
