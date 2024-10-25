import { ElementType, FC } from 'react';
import { type TypographyProps } from './Typography.types';
import { StyledTypography } from '../../../ui/Typography';

type TypographyComponent = typeof StyledTypography & {
  <C extends ElementType = 'p'>(
    props: { as?: C } & TypographyProps &
      Omit<React.ComponentPropsWithoutRef<C>, keyof TypographyProps>
  ): FC;
};

const Typography = StyledTypography as TypographyComponent;

export { Typography };
