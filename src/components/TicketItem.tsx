import { FC, useRef } from 'react';

import { Stack } from './common/Stack';
import { TicketItemButtons } from './TicketItemButtons';

import { SortableTypeEnum, StatusEnum, type Color } from '../types/SharedTypes';

import { tokens } from '../theme/base';
import { useTicketContext } from '../context/TicketContext';
import { useTicketState } from '../hooks/useTicketState';
import { mapResponsiveValues } from '../responsive/mapResponsiveValues';
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

  const inputRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = () => {
    toggleContentEditable();
    if (inputRef.current) {
      //Workaround for properly setting focus on a contentEditable div
      setTimeout(function () {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      e.relatedTarget &&
      e.relatedTarget instanceof HTMLElement &&
      e.relatedTarget.tagName === 'BUTTON'
    ) {
      return;
    }
    toggleContentEditable();
  };

  const handleUpdate = () => {
    updateTicket(id, {
      content: inputRef?.current?.textContent ?? '',
    });
    toggleContentEditable();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeTicket(id, status);
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
      css={[
        {
          backgroundColor: tokens.colors[backgroundColor],
          cursor: 'pointer',
          width: '100%',
          padding: tokens.space['large-xs'],
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
            fontSize: `${tokens.size['small-sm']}`,
            padding: tokens.space['small-xs'],
          },
          md: {
            fontSize: `${tokens.size['large-xs']}`,
            padding: tokens.space['small-md'],
          },
          lg: { fontSize: `${tokens.size['large-sm']}` },
        }),
      ]}
    >
      {isHovered && (
        <TicketItemButtons
          isEditing={isContentEditable}
          onDelete={handleDelete}
          onEdit={handleUpdate}
        />
      )}
      <div
        css={{
          outline: isContentEditable
            ? `solid ${tokens.colors.gray200}`
            : 'none',
          borderRadius: tokens.radii.xs,
          padding: tokens.space['small-sm'],
          boxSizing: 'border-box',
        }}
        contentEditable={isContentEditable}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
        ref={inputRef}
      >
        {content}
      </div>
    </Stack>
  );
};
