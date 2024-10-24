import { ChangeEvent, FC } from 'react';

import { useTokens } from '../../theme/tokens';

import TextareaAutosize from 'react-textarea-autosize';

type TicketItemTextAreaProps = {
  onBlur: () => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TicketItemTextArea: FC<TicketItemTextAreaProps> = ({
  value,
  onBlur,
  onChange,
}) => {
  const tokens = useTokens();
  return (
    <TextareaAutosize
      aria-label="Edit ticket content"
      rows={1}
      onBlur={onBlur}
      autoFocus
      value={value}
      onChange={onChange}
      css={{
        padding: 0,
        boxSizing: 'border-box',
        border: 'none',
        background: 'transparent',
        resize: 'none',
        color: tokens.colors.white,
        outline: 'none',
        textAlign: 'center',
        '& fieldset': {
          border: 'none',
        },
      }}
    />
  );
};
