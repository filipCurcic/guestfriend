import { ElementType } from 'react';
import { type TypographyProps } from './Typography.types';
import { useTokens } from '../../../theme/tokens';

const Typography = <C extends ElementType = 'p'>({
  as,
  color,
  emphasis,
  size,
  style,
  children,
}: TypographyProps<C>) => {
  const Component = as || 'p';
  const tokens = useTokens();
  return (
    <Component
      style={{
        margin: 0,
        color: tokens.colors.white,
        ...(color && { color: tokens.colors[color] }),
        ...(size && { fontSize: tokens.size[size] }),
        ...(emphasis && { opacity: tokens.emphasis[emphasis] }),
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

export { Typography };
