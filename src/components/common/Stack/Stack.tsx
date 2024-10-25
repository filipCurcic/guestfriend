import { forwardRef } from 'react'
import { type StackProps } from './Stack.types'
import { StyledStack } from '../../../ui/Stack'

/**
 * __Stack__
 *
 * Div container with default flexbox behavior
 *
 * @param direction horizontal or vertical, sets the direction of the flexbox items inside of the Stack.
 * @param center centers the content inside of the stack, setting both justify and align to center
 * @param justify sets the justify-content property
 * @param align sets the align-items property
 * @param gap sets the flex gap property
 *
 * @example <Stack direction="horizontal"> {children} </Stack>
 * @example <Stack direction="vertical"> {children} </Stack>
 * @example <Stack justify="flex-end" align="center"> {children} </Stack>
 * @example <Stack center> {children} </Stack>
 * @example <Stack gap="small-sm"> {children} </Stack>
 *
 */

const Stack = forwardRef<HTMLDivElement, StackProps>(
    ({ children, ...props }, ref) => {
        return (
            <StyledStack ref={ref} {...props}>
                {children}
            </StyledStack>
        )
    }
)
export { Stack }
