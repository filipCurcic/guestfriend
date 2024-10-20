import { useRef, useState } from 'react';
import { Stack } from './common/Stack';

import { type Color } from '../types/SharedTypes';

import { tokens } from '../theme/base';
import { useTicketContext } from '../context/TicketContext';
import { TicketItemButtons } from './TicketItemButtons';

type TicketItemProps = {
  backgroundColor: Color;
  title: string;
  id: string;
};

export const TicketItem = ({ backgroundColor, title, id }: TicketItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isContentEditable, setIsContentEditable] = useState(false);

  const { removeTicket, updateTicket } = useTicketContext();

  const inputRef = useRef<HTMLDivElement>(null);

  const handleHoverEffects = (event: 'enter' | 'leave') => {
    setIsHovered(event === 'enter' ? true : false);
  };

  const handleDoubleClick = () => {
    setIsContentEditable(true);
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
    setIsContentEditable(false);
  };

  const handleUpdate = () => {
    updateTicket(id, {
      title: inputRef?.current?.textContent ?? '',
    });
    setIsContentEditable(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeTicket(id);
  };

  return (
    <Stack
      vertical
      onMouseEnter={() => handleHoverEffects('enter')}
      onMouseLeave={() => handleHoverEffects('leave')}
      onDoubleClick={handleDoubleClick}
      css={{
        backgroundColor: tokens.colors[backgroundColor],
        cursor: 'pointer',
        width: '70%',
        padding: tokens.space['large-xs'],
        boxShadow: tokens.elevation.sm,
        position: 'relative',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
        transition: 'box-shadow 0.2s',
        ':hover': {
          boxShadow: tokens.elevation.md,
        },
      }}
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
        {title}
      </div>
    </Stack>
  );
};
