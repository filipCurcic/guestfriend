import { isBreakpointsMap } from './isBreakpointsMap';
import { ResponsiveValue } from './responsive.types';

export const isSingularValue = <A>(value: ResponsiveValue<A>): value is A =>
  !isBreakpointsMap(value);
