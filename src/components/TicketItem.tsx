import { useRef, useState } from 'react';
import { Button } from './common/Button';
import { Stack } from './common/Stack';

import { type Color } from '../types/SharedTypes';

import { tokens } from '../theme/base';

type TicketItemProps = {
  backgroundColor: Color;
  title: string;
  id: string;
};

export const TicketItem = ({ backgroundColor, title }: TicketItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isContentEditable, setIsContentEditable] = useState(false);

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

  const handleBlur = () => {
    setIsContentEditable(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
    console.log(e.target.textContent);
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
        <Button
          css={{
            position: 'absolute',
            top: tokens.space['small-xxs'],
            right: tokens.space['small-xxs'],
          }}
        >
          x
        </Button>
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
        onInput={handleChange}
      >
        {title}
      </div>
    </Stack>
  );
};
