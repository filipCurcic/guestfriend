import styled from '@emotion/styled'
import { Stack } from '../components/common/Stack'
import { mapResponsiveValues } from '../responsive/mapResponsiveValues'
import { Typography } from '../components/common/Typography'

export const StyledAppContainer = styled(Stack)`
    ${({ theme }) => `
    margin-top: ${theme.tokens.space['large-sm']};
  `}
`

export const StyledInnerContainer = styled(Stack)`
    ${({ theme }) => `
    height: 100%;
    background: ${theme.tokens.colors.white};
  `}
    ${mapResponsiveValues({
        sm: { width: '100%' },
        md: { width: '70%' },
        lg: { width: '60%' },
    })}
`

export const StyledAppHeader = styled('header')`
    display: flex;
    justify-content: space-between;
`

export const StyledHeaderTitle = styled(Typography)`
    ${({ theme }) => `
    color: ${theme.tokens.colors.black};
  `}
    ${({ theme }) =>
        mapResponsiveValues({
            sm: { fontSize: theme.tokens.size['large-xs'] },
            md: { fontSize: theme.tokens.size['large-sm'] },
            lg: { fontSize: theme.tokens.size['large-md'] },
        })}
`
