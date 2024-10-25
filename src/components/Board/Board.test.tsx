import { screen } from '@testing-library/react'
import { Board } from './Board'
import {
    mockColumns,
    renderWithProviders,
    setupStatusColumnHook,
    setupTicketContext,
} from '../../util/testUtils'

jest.mock('../../hooks/useStatusColumn')
jest.mock('../../context/TicketContext')

const renderBoard = (activeItem = undefined) => {
    return renderWithProviders(<Board activeItem={activeItem} />)
}
describe('Board Component', () => {
    beforeEach(() => {
        setupTicketContext()
        setupStatusColumnHook()
        renderBoard()
    })

    it('should render a StatusColumn for each status in columns', () => {
        Object.keys(mockColumns).forEach((status) => {
            const columnElement = screen.getByTestId(`column-${status}`)
            expect(columnElement).toBeInTheDocument()
        })
    })

    it('should display the name for the StatusColumn for each status in columns', () => {
        Object.keys(mockColumns).forEach(() => {
            const columnElements = screen.getAllByText(`To Do`)
            columnElements.forEach((element) => {
                expect(element).toBeInTheDocument()
            })
        })
    })

    it('should not render DragOverlay when activeItem prop is not provided', () => {
        const overlayContent = screen.queryByText('Active Ticket')
        expect(overlayContent).not.toBeInTheDocument()
    })
})
