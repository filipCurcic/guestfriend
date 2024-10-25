import { screen, fireEvent } from '@testing-library/react'
import { TicketItem, TicketItemProps } from './TicketItem'
import { StatusEnum } from '../../types/SharedTypes'
import { renderWithProviders, setupTicketContext } from '../../util/testUtils'

jest.mock('../../context/TicketContext')

const mockRemoveTicket = jest.fn()
const mockUpdateTicket = jest.fn()

const defaultProps: TicketItemProps = {
    backgroundColor: 'blue200',
    content: 'Test Content',
    id: '1',
    status: StatusEnum.TO_DO,
}

const renderTicketItem = (props: Partial<TicketItemProps> = {}) => {
    return renderWithProviders(<TicketItem {...defaultProps} {...props} />)
}

describe('TicketItem Component', () => {
    beforeEach(() => {
        setupTicketContext({
            removeTicket: mockRemoveTicket,
            updateTicket: mockUpdateTicket,
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render the ticket content', () => {
        renderTicketItem()
        const contentElement = screen.getByText('Test Content')
        expect(contentElement).toBeInTheDocument()
    })

    it('should render "Add content" if no content is provided', () => {
        renderTicketItem({ content: '' })
        const placeholderElement = screen.getByText('Add content')
        expect(placeholderElement).toBeInTheDocument()
    })

    it('should display delete button on hover', () => {
        renderTicketItem()
        const ticketItem = screen.getByTestId('1')
        fireEvent.mouseEnter(ticketItem)
        const deleteButton = screen.getByTestId(`remove-${StatusEnum.TO_DO}`)
        expect(deleteButton).toBeInTheDocument()
    })

    it('should call removeTicket when delete button is clicked', () => {
        renderTicketItem()
        const ticketItem = screen.getByTestId('1')
        fireEvent.mouseEnter(ticketItem)
        const deleteButton = screen.getByTestId(`remove-${StatusEnum.TO_DO}`)
        fireEvent.click(deleteButton)
        expect(mockRemoveTicket).toHaveBeenCalledTimes(1)
        expect(mockRemoveTicket).toHaveBeenCalledWith(
            defaultProps.id,
            defaultProps.status
        )
    })

    it('should toggle content editable on double-click', () => {
        renderTicketItem()

        const contentElement = screen.getByText('Test Content')
        fireEvent.doubleClick(contentElement)

        const editableTextArea = screen.getByTestId(`edit-1`)
        expect(editableTextArea).toBeInTheDocument()
    })

    it('should update content on blur after editing', () => {
        renderTicketItem()

        fireEvent.doubleClick(screen.getByText('Test Content'))
        const editableTextArea = screen.getByRole('textbox')

        fireEvent.change(editableTextArea, {
            target: { value: 'Updated Content' },
        })
        fireEvent.blur(editableTextArea)

        expect(mockUpdateTicket).toHaveBeenCalledWith(defaultProps.id, {
            content: 'Updated Content',
        })
    })

    it('should handle Enter key for toggling edit mode', () => {
        renderTicketItem()

        const contentElement = screen.getByText('Test Content')
        fireEvent.keyDown(contentElement, { key: 'Enter' })

        const editableTextArea = screen.getByRole('textbox')
        expect(editableTextArea).toBeInTheDocument()

        fireEvent.change(editableTextArea, {
            target: { value: 'Updated Content' },
        })
        fireEvent.keyDown(editableTextArea, { key: 'Enter' })

        expect(mockUpdateTicket).toHaveBeenCalledWith(defaultProps.id, {
            content: 'Updated Content',
        })
    })
})
