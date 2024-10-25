import { FC, useRef, ChangeEvent, useState, useEffect } from 'react';

import { Typography } from '../common/Typography';
import { TicketItemButton } from './TicketItemButton';
import { TicketItemTextArea } from './TicketItemTextArea';

import {
  SortableTypeEnum,
  StatusEnum,
  type Color,
} from '../../types/SharedTypes';

import { useTicketContext } from '../../context/TicketContext';
import { useTicketState } from '../../hooks/useTicketState';

import { useSortable } from '@dnd-kit/sortable';
import { StyledStackItem } from '../../ui/Ticket';

export type TicketItemProps = {
  backgroundColor: Color;
  content: string;
  id: string;
  status: StatusEnum;
};

export const TicketItem: FC<TicketItemProps> = ({
  backgroundColor,
  content,
  status,
  id,
}) => {
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const {
    isHovered,
    isContentEditable,
    handleHoverEffects,
    toggleContentEditable,
  } = useTicketState();

  const { removeTicket, updateTicket } = useTicketContext();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: { type: SortableTypeEnum.TICKET, status, content, backgroundColor },
    });

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleDoubleClick = () => {
    toggleContentEditable();
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const handleBlur = () => {
    if (isContentEditable) {
      toggleContentEditable();
      updateTicket(id, { content: editedContent });
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeTicket(id, status);
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !isContentEditable) {
      e.preventDefault();
      handleDoubleClick();
    }
    if (e.key === 'Enter' && isContentEditable) {
      e.preventDefault();
      updateTicket(id, { content: editedContent });
      toggleContentEditable();
    }
  };

  return (
    <StyledStackItem
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
    >
      {isHovered && <TicketItemButton onDelete={handleDelete} />}

      {isContentEditable ? (
        <TicketItemTextArea
          onBlur={handleBlur}
          value={editedContent}
          onChange={handleChange}
        />
      ) : (
        <Typography css={{ textAlign: 'center' }}>{content}</Typography>
      )}
    </StyledStackItem>
  );
};
