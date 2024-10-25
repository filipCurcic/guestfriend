import { ChangeEvent, FC } from 'react'

import { StyledTextarea } from '../../ui/Ticket'

type TicketItemTextAreaProps = {
    onBlur: () => void
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

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
