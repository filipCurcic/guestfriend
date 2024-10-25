import { forwardRef } from 'react';
import { type StackProps } from './Stack.types';
import { StyledStack } from '../../../ui/Stack';

const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledStack ref={ref} {...props}>
        {children}
      </StyledStack>
    );
  }
);
export { Stack };
