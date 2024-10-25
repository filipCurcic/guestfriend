import styled from '@emotion/styled';
import { TypographyProps } from '../components/common/Typography/Typography.types';

export const StyledTypography = styled('p')<TypographyProps>`
  margin: 0;
  color: ${({ theme }) => theme.tokens.colors.white};

  ${({ color, theme }) =>
    color &&
    `
    color: ${theme.tokens.colors[color]};
  `}

  ${({ emphasis, theme }) =>
    emphasis &&
    `
    opacity: ${theme.tokens.emphasis[emphasis]};
  `}
`;
