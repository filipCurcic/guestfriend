import { FC } from 'react'

import { Stack } from './../common/Stack'

import { useTicketContext } from '../../context/TicketContext'

import {
    StyledColumnHeader,
    StyledColumnHeaderButton,
    StyledTicketCountStack,
    StyledTitleTypography,
} from '../../ui/ColumnHeader'

import { type Color, StatusEnum } from '../../types/SharedTypes'

import { v4 as uuidv4 } from 'uuid'

type ColumnHeaderProps = {
    backgroundColor: Color
    numberOfTickets: number
    status: StatusEnum
    title: string
}

/**
 * __ColumnHeader__
 *
 * @component
 * Component that renders the header of a column, with a title and a button to add a new ticket
 *
 * @param backgroundColor background color of the header
 * @param numberOfTickets number of tickets in the column below the header
 * @param title title of the header
 * @param status status of the column
 *
 */

export const ColumnHeader: FC<ColumnHeaderProps> = ({
    backgroundColor,
    numberOfTickets,
    status,
    title,
}) => {
    const { addTicket } = useTicketContext()

    const handleNewTicket = () => {
        addTicket('', status, uuidv4())
    }

    return (
        <StyledColumnHeader
            direction="vertical"
            backgroundColor={backgroundColor}
        >
            <Stack align="center">
                <StyledTitleTypography as="h2" aria-label={title}>
                    {title}
                </StyledTitleTypography>
                <StyledColumnHeaderButton
                    onClick={handleNewTicket}
                    aria-label="Add new ticket"
                >
                    +
                </StyledColumnHeaderButton>
            </Stack>
            <StyledTicketCountStack aria-live="polite" center>
                ({numberOfTickets})
            </StyledTicketCountStack>
        </StyledColumnHeader>
    )
}
