import { FC } from 'react'

import { TicketItem } from './TicketItem'

import { type Ticket, StatusEnum, Color } from '../../types/SharedTypes'
import { StyledTicketsContainer } from '../../ui/Ticket'

type TicketsContainerProps = {
    containerColor: Color
    isOver: boolean
    status: StatusEnum
    ticketColor: Color
    tickets: Ticket[]
}

/**
 * __TicketsContainer__
 *
 * @component
 * Component that renders the list of tickets
 *
 * @param containerColor background color of the container
 * @param isOver boolean that represents if the container is being hovered over by a dragged item
 * @param status status of the column
 * @param tickets array of tickets
 * @param ticketColor background color of the ticket
 *
 */

export const TicketsContainer: FC<TicketsContainerProps> = ({
    containerColor,
    isOver,
    status,
    tickets,
    ticketColor,
}) => {
    return (
        <StyledTicketsContainer
            direction="vertical"
            containerColor={containerColor}
            isOver={isOver}
            align="center"
            gap="small-lg"
            aria-live="polite"
            role="list"
        >
            {tickets.map((ticket) => (
                <TicketItem
                    key={ticket.id}
                    content={ticket.content}
                    id={ticket.id}
                    backgroundColor={ticketColor}
                    status={status}
                />
            ))}
        </StyledTicketsContainer>
    )
}
