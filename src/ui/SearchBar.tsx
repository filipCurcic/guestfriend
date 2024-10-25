import styled from '@emotion/styled'

export const StyledSearchInput = styled.input`
    ${({ theme }) => `
    width: 33%;
    padding: ${theme.tokens.space['small-xs']};
    border: none;
    border-bottom: 1px solid ${theme.tokens.colors.gray200};
  `}
`
