import { ForwardedRef, forwardRef } from 'react';
import { useTokens } from '../../../theme/tokens';
import { type StackProps } from './Stack.types';

const Stack = forwardRef(
  (
    {
      vertical,
      horizontal,
      justify = 'start',
      align = 'stretch',
      gap,
      center,
      padding,
      children,
      ...props
    }: StackProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const tokens = useTokens();
    return (
      <div
        ref={ref}
        css={{
          display: 'flex',
          ...(vertical && { flexDirection: 'column' }),
          ...(horizontal && { flexDirection: 'row' }),
          ...(center
            ? {
                alignItems: 'center',
                justifyContent: 'center',
              }
            : { alignItems: align, justifyContent: justify }),
          ...(gap && { gap: tokens.space[gap] }),
          ...(padding && { padding: tokens.space[padding] }),
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
export { Stack };
