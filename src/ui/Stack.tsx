import styled from '@emotion/styled'
import { StackProps } from '../components/common/Stack/Stack.types'

export const StyledStack = styled('div')<StackProps>`
    display: flex;
    flex-direction: ${({ direction }) =>
        direction === 'vertical' ? 'column' : 'row'};
    ${({ center }) =>
        center &&
        `
    align-items: center;
    justify-content: center;
  `}
    ${({ justify, center }) =>
        !center &&
        justify &&
        `
    justify-content: ${justify};
  `}
  ${({ align, center }) =>
        !center &&
        align &&
        `
    align-items: ${align};
  `}
  ${({ gap, theme }) =>
        gap &&
        `
    gap: ${theme.tokens.space[gap]};
  `}
`
