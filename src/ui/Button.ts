import styled from '@emotion/styled'

export const StyledButton = styled('button')`
    margin: 0;
    border: none;
    outline: none;
    cursor: pointer;
    width: fit-content;
    background: transparent;
    text-decoration: none;
    color: ${({ theme }) => theme.tokens.colors.white};
    border-radius: ${({ theme }) => theme.tokens.radii.full};
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
        opacity: ${({ theme }) => theme.tokens.emphasis.low};
    }

    &:focus {
        outline: solid ${({ theme }) => theme.tokens.colors.red200};
    }
`
