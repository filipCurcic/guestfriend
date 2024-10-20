import { PropsWithChildren } from 'react';
import { useTokens } from '../../../theme/tokens';
import { ButtonProps } from './Button.types';

const Button = ({
  size,
  color,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const tokens = useTokens();
  return (
    <button
      css={{
        margin: 0,
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        width: 'fit-content',
        background: 'transparent',
        textDecoration: 'none',
        color: color ? tokens.colors[color] : tokens.colors.white,
        borderRadius: tokens.radii.full,
        lineHeight: 1,
        ...(size && { fontSize: tokens.size[size] }),
      }}
      {...props}
    >
      {children}
    </button>
  );
};
export { Button };
