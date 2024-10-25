import { ChangeEvent, FC } from 'react'

import { StyledTextarea } from '../../ui/Ticket'

type TicketItemTextAreaProps = {
    onBlur: () => void
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

/**
 * __TicketItemTextArea__
 *
 * @component
 * Editable text area component
 *
 * @param value content of the textarea
 * @param onBlur function that executes after the text area loses focus
 * @param onChange function that executes on each value change
 *
 */

export const TicketItemTextArea: FC<TicketItemTextAreaProps> = ({
    value,
    onBlur,
    onChange,
}) => {
    return (
        <StyledTextarea
            aria-label="Edit ticket content"
            rows={1}
            onBlur={onBlur}
            autoFocus
            value={value}
            onChange={onChange}
        />
    )
}
