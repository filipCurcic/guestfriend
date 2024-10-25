import { screen, fireEvent } from '@testing-library/react'

import { ColumnHeader } from './ColumnHeader'

import { renderWithProviders, setupTicketContext } from '../../util/testUtils'

import { StatusEnum } from '../../types/SharedTypes'

jest.mock('../../context/TicketContext')

const mockAddTicket = jest.fn()
const tickets = []

const renderColumnHeader = (props = {}) => {
    return renderWithProviders(
        <ColumnHeader
            title="Test Column"
            numberOfTickets={tickets.length}
            backgroundColor="gray200"
            status={StatusEnum.TO_DO}
            {...props}
        />
    )
}

describe('ColumnHeader Component', () => {
    beforeEach(() => {
        setupTicketContext({ addTicket: mockAddTicket })
        renderColumnHeader()
    })

    it('should render the column title', () => {
        const titleElement = screen.getByText('Test Column')
        expect(titleElement).toBeInTheDocument()
        expect(titleElement).toHaveTextContent('Test Column')
    })

    it('should render the ticket count', () => {
        const ticketCountElement = screen.getByText(`(${tickets.length})`)
        expect(ticketCountElement).toBeInTheDocument()
    })

    it('should call addTicket when the button is clicked', () => {
        const buttonElement = screen.getByLabelText('Add new ticket')
        fireEvent.click(buttonElement)
        expect(mockAddTicket).toHaveBeenCalledTimes(1)
        expect(mockAddTicket).toHaveBeenCalledWith(
            '',
            'TO_DO',
            expect.any(String)
        )
    })

    it('should render the button for adding new tickets', () => {
        const buttonElement = screen.getByLabelText('Add new ticket')
        expect(buttonElement).toBeInTheDocument()
        expect(buttonElement).toHaveTextContent('+')
    })
})
