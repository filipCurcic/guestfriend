import { CSSObject } from '@emotion/react';
import { ResponsiveValue } from './responsive.types';
import { isSingularValue } from './isSingularValue';

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
