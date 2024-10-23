import { CSSProperties } from 'react';
import { breakpoints } from './breakpoints';
import { getResponsiveStyles } from './getResponsiveStyles';
import { BreakpointsEnum } from './responsive.types';

export const mapResponsiveValues = (
  stylesByBreakpoint: Partial<Record<'sm' | 'md' | 'lg' | 'xl', CSSProperties>>
) => {
  const defaultStyles = {
    [BreakpointsEnum.sm]: {},
    [BreakpointsEnum.md]: {},
    [BreakpointsEnum.lg]: {},
    [BreakpointsEnum.xl]: {},
  };

  const finalStyles = { ...defaultStyles, ...stylesByBreakpoint };
  return getResponsiveStyles(
    {
      [breakpoints.sm]: 'sm',
      [breakpoints.md]: 'md',
      [breakpoints.lg]: 'lg',
      [breakpoints.xl]: 'xl',
    } as const,
    (size) => {
      return finalStyles[size] || {};
    }
  );
};
