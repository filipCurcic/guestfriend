import { ElementType } from 'react';
import { type TypographyProps } from './Typography.types';
import { useTokens } from '../../../theme/tokens';

const Typography = <C extends ElementType = 'p'>({
  as,
  color,
  emphasis,
  size,
  children,
  ...props
}: TypographyProps<C>) => {
  const Component = as || 'p';
  const tokens = useTokens();
  return (
    <Component
      css={{
        margin: 0,
        color: tokens.colors.white,
        ...(color && { color: tokens.colors[color] }),
        ...(size && { fontSize: tokens.size[size] }),
        ...(emphasis && { opacity: tokens.emphasis[emphasis] }),
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Typography };
