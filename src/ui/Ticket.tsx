import styled from '@emotion/styled'
import { CSS, Transform } from '@dnd-kit/utilities'
import { StackProps } from '../components/common/Stack/Stack.types'
import { mapResponsiveValues } from '../responsive/mapResponsiveValues'
import { type Color } from '../types/SharedTypes'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from '../components/common/Button'
import { Stack } from '../components/common/Stack'
import { Typography } from '../components/common/Typography'

export const StyledStackItem = styled(Stack)<
    StackProps & {
        backgroundColor: Color
        transition?: string
        transform: Transform | null
    }
>`
    display: flex;
    flex-direction: ${({ direction }) =>
        direction === 'vertical' ? 'column' : 'row'};
    width: 100%;
    cursor: pointer;
    position: relative;

    transition: ${({ transition }) => transition || 'all 0.2s ease-in-out'};
    transform: ${({ transform }) => CSS.Transform.toString(transform ?? null)};

    ${({ theme, backgroundColor }) =>
        `
    background-color: ${theme.tokens.colors[backgroundColor]};
    &:hover {
        box-shadow: ${theme.tokens.elevation.md};
    }
    padding: ${theme.tokens.space['large-md']};
    box-shadow: ${theme.tokens.elevation.sm};
  `}

    ${({ gap, theme }) =>
        gap &&
        `
    gap: ${theme.tokens.space[gap]};
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

  ${({ theme }) =>
        mapResponsiveValues({
            sm: {
                fontSize: theme.tokens.size['small-md'],
                padding: theme.tokens.space['small-sm'],
            },
            md: {
                fontSize: theme.tokens.size['large-xs'],
                padding: theme.tokens.space['large-md'],
            },
            lg: {
                fontSize: theme.tokens.size['small-lg'],
            },
        })}
`

export const StyledTextarea = styled(TextareaAutosize)`
    padding: 0;
    box-sizing: border-box;
    border: none;
    background: transparent;
    resize: none;
    color: ${({ theme }) => theme.tokens.colors.white};
    outline: none;
    text-align: center;

    & fieldset {
        border: none;
    }
`

export const StyledTicketButton = styled(Button)`
    position: absolute;
    ${({ theme }) =>
        mapResponsiveValues({
            sm: {
                top: theme.tokens.size['small-xs'],
                right: theme.tokens.space['small-xs'],
            },
            md: {
                top: theme.tokens.size['small-sm'],
                right: theme.tokens.space['small-xs'],
            },
            lg: {
                top: theme.tokens.space['small-sm'],
                right: theme.tokens.space['small-xs'],
            },
        })}
`

export const StyledTicketsContainer = styled(Stack)<{
    isOver: boolean
    containerColor: Color
}>`
    ${({ theme, containerColor, isOver }) => `
    opacity: ${
        isOver ? theme.tokens.emphasis.medium : theme.tokens.emphasis.full
    };
    width: 100%;
    background-color:  ${theme.tokens.colors[containerColor]};
    min-height: 450px;
    max-height: 450px;
    overflow-y: auto;
    padding: ${theme.tokens.space['small-lg']};
  `}
`

export const StyledTicketContent = styled(Typography)<{ hasContent: boolean }>`
    ${({ hasContent }) => `
    opacity: ${hasContent ? 1 : '0.5'};
    text-align: center;
    word-break: break-word;
    overflow-wrap: break-word;
    overflow: auto;
    max-height: 200px;
  `}
`
