import styled from '@emotion/styled';
import { Stack } from '../components/common/Stack';
import { type Color } from '../types/SharedTypes';
import { Typography } from '../components/common/Typography';
import { mapResponsiveValues } from '../responsive/mapResponsiveValues';
import { Button } from '../components/common/Button';

type StyledColumnHeaderProps = {
  backgroundColor: Color;
};

export const StyledColumnHeader = styled(Stack)<StyledColumnHeaderProps>`
  ${({ theme, backgroundColor }) => `
    position: relative;
    background-color: ${theme.tokens.colors[backgroundColor]};
    padding: ${theme.tokens.space['small-sm']};
  `}
`;

export const StyledTitleTypography = styled(Typography)`
  flex-grow: 1;
  text-align: center;
  ${({ theme }) =>
    mapResponsiveValues({
      sm: { fontSize: theme.tokens.size['small-md'] },
      md: { fontSize: theme.tokens.size['large-xs'] },
      lg: { fontSize: theme.tokens.size['large-sm'] },
    })}
`;

export const StyledColumnHeaderButton = styled(Button)`
  position: absolute;
  ${({ theme }) =>
    mapResponsiveValues({
      sm: {
        fontSize: theme.tokens.size['large-xs'],
        right: 0,
      },
      md: { fontSize: theme.tokens.size['large-md'], right: 0 },
      lg: {
        fontSize: theme.tokens.size['large-md'],
        right: theme.tokens.space['small-sm'],
      },
    })}
`;

export const StyledTicketCountStack = styled(Stack)`
  ${({ theme }) =>
    mapResponsiveValues({
      sm: { fontSize: theme.tokens.size['small-md'] },
      md: { fontSize: theme.tokens.size['small-lg'] },
      lg: { fontSize: theme.tokens.size['large-xs'] },
    })}
`;
