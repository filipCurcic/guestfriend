import { CSSObject } from '@emotion/react';
import { ResponsiveValue } from './responsive.types';
import { isSingularValue } from './isSingularValue';

/**
 * __getResponsiveStyles__
 *
 * Applies the styles for each optional breakpoint by creating a mediaQuery
 *
 * @param value Map of breakpoints to values, e.g. `{ 600: 'md', 960: 'lg' }`
 * @param styles Function that receives the value and returns a style object
 * @returns Style object with styles for each breakpoint
 *
 * @example 
 * css={getResponsiveStyles(
              {
                [breakpoints.sm]: 'sm',
                [breakpoints.md]: 'md',
                [breakpoints.lg]: 'lg',
              },
              (size) => {
                switch (size) {
                  case 'sm':
                    return {fontSize: theme.tokens.size['small-sm']}
                  default:
                    return {fontSize: theme.tokens.size['small-md']}
                }
              }
            )}
 *              
 * 
 */

export const getResponsiveStyles = <V>(
  value: ResponsiveValue<V>,
  styles: (value: V) => CSSObject
) =>
  isSingularValue(value)
    ? styles(value)
    : Object.fromEntries(
        Object.entries(value).map(([breakpoint, value]) => [
          `@media (min-width: ${breakpoint}px)`,
          styles(value),
        ])
      );
