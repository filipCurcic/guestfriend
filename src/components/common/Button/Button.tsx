import { PropsWithChildren } from 'react';

import { useTokens } from '../../../theme/tokens';

import { ButtonProps } from './Button.types';

const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  const tokens = useTokens();
  return (
    <button
      type="button"
      css={{
        margin: 0,
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        width: 'fit-content',
        background: 'transparent',
        textDecoration: 'none',
        color: tokens.colors.white,
        borderRadius: tokens.radii.full,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ':disabled': {
          opacity: tokens.emphasis.low,
        },
        ':focus': {
          outline: `solid ${tokens.colors.red200}`,
        },
      }}
      {...props}
    >
      {children}
    </button>
  );
};
export { Button };
