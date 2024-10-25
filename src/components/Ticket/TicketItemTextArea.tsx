import { ChangeEvent, FC } from 'react'

import { StyledTextarea } from '../../ui/Ticket'

type TicketItemTextAreaProps = {
    onBlur: () => void
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    id: string
}

export const TicketItemTextArea: FC<TicketItemTextAreaProps> = ({
    id,
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
            data-testid={`edit-${id}`}
        />
    )
}
