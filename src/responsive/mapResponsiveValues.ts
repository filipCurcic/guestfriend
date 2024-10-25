import { CSSProperties } from 'react';
import { breakpoints } from './breakpoints';
import { getResponsiveStyles } from './getResponsiveStyles';
import { BreakpointsEnum } from './responsive.types';

/**
 * __mapResponsiveValues__
 *
 * Applies the styles for each optional breakpoint by creating a mediaQuery
 *
 * @param stylesByBreakpoint key:value pairs of breakpoints and styles object
 * @returns styles object for each breakpoint
 *
 * @example <div css={mapResponsiveValues({
                sm: { width: '100%' },
                md: { width: '70%' },
                lg: { width: '60%' },
            })} {children} </div>
 *              
 * @example <div css={mapResponsiveValues({
                sm: { backgroundColor: 'red' },
            })} {children} </div>
 * 
 */

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
