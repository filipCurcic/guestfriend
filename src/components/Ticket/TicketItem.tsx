import { FC, useRef, ChangeEvent, useState, useEffect } from 'react';

import { Stack } from './../common/Stack';
import { Typography } from '../common/Typography';
import { TicketItemButton } from './TicketItemButton';
import { TicketItemTextArea } from './TicketItemTextArea';

import {
  SortableTypeEnum,
  StatusEnum,
  type Color,
} from '../../types/SharedTypes';

import { tokens } from '../../theme/base';
import { useTicketContext } from '../../context/TicketContext';
import { useTicketState } from '../../hooks/useTicketState';
import { mapResponsiveValues } from '../../responsive/mapResponsiveValues';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
    <Stack
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      vertical
      onMouseEnter={() => handleHoverEffects('enter')}
      onMouseLeave={() => handleHoverEffects('leave')}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      role="listitem"
      tabIndex={0}
      css={[
        {
          backgroundColor: tokens.colors[backgroundColor],
          cursor: 'pointer',
          width: '100%',
          padding: tokens.space['large-md'],
          boxShadow: tokens.elevation.sm,
          position: 'relative',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          transform: CSS.Transform.toString(transform),
          transition,
          ':hover': {
            boxShadow: tokens.elevation.md,
          },
        },
        mapResponsiveValues({
          sm: {
            fontSize: `${tokens.size['small-md']}`,
            padding: tokens.space['small-xs'],
          },
          md: {
            fontSize: `${tokens.size['large-xs']}`,
            padding: tokens.space['large-md'],
          },
          lg: { fontSize: `${tokens.size['small-lg']}` },
        }),
      ]}
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
    </Stack>
  );
};
