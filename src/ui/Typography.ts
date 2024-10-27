import styled from '@emotion/styled'
import { TypographyProps } from '../components/common/Typography/Typography.types'

export const StyledTypography = styled('p')<TypographyProps>`
    margin: 0;
    ${({ color, theme }) =>
        color &&
        `
    color:  ${color ? theme.tokens.colors[color] : theme.tokens.colors.white};
  `}
`
