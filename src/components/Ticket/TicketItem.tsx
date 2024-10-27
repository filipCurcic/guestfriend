import { FC, useRef, ChangeEvent, useState } from 'react'

import { TicketItemTextArea } from './TicketItemTextArea'

import {
    StyledTicketButton,
    StyledTicketContainer,
    StyledTicketContent,
} from '../../ui/Ticket'

import {
    SortableTypeEnum,
    StatusEnum,
    type Color,
} from '../../types/SharedTypes'

import { useTicketContext } from '../../context/TicketContext'
import { useTicketState } from '../../hooks/useTicketState'

import { useSortable } from '@dnd-kit/sortable'

export type TicketItemProps = {
    backgroundColor: Color
    content: string
    id: string
    status: StatusEnum
}

/**
 * __TicketItem__
 *
 * Component that renders the singular ticket
 *
 * @component
 * @param backgroundColor background color of the ticket
 * @param content text content of the ticket
 * @param status status of the ticket
 * @param id
 *
 *
 */

export const TicketItem: FC<TicketItemProps> = ({
    backgroundColor,
    content,
    status,
    id,
}) => {
    const [editedContent, setEditedContent] = useState(content)

    const {
        isHovered,
        isContentEditable,
        handleHoverEffects,
        toggleContentEditable,
    } = useTicketState()

    const { removeTicket, updateTicket } = useTicketContext()

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id,
            data: {
                type: SortableTypeEnum.TICKET,
                status,
                content,
                backgroundColor,
            },
        })

    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleDoubleClick = () => {
        toggleContentEditable()
        if (inputRef.current) {
            inputRef.current?.focus()
        }
    }

    const handleBlur = () => {
        if (isContentEditable) {
            toggleContentEditable()
            updateTicket(id, { content: editedContent })
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        removeTicket(id, status)
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditedContent(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (isContentEditable) {
                updateTicket(id, { content: editedContent })
                toggleContentEditable()
            } else {
                handleDoubleClick()
            }
        }
    }

    return (
        <StyledTicketContainer
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            direction="vertical"
            onMouseEnter={() => handleHoverEffects('enter')}
            onMouseLeave={() => handleHoverEffects('leave')}
            onDoubleClick={handleDoubleClick}
            onKeyDown={handleKeyDown}
            backgroundColor={backgroundColor}
            transform={transform}
            transition={transition}
            tabIndex={0}
            role="listitem"
            aria-label={`${status} Ticket ${content}`}
            data-testid={id}
        >
            {isHovered && (
                <StyledTicketButton
                    onClick={handleDelete}
                    aria-label={'Delete ticket'}
                >
                    x
                </StyledTicketButton>
            )}

            {isContentEditable ? (
                <TicketItemTextArea
                    onBlur={handleBlur}
                    value={editedContent}
                    onChange={handleChange}
                />
            ) : (
                <StyledTicketContent hasContent={!!content}>
                    {content || 'Add content'}
                </StyledTicketContent>
            )}
        </StyledTicketContainer>
    )
}
