import { BreakpointsMap, ResponsiveValue } from './responsive.types';

export const isBreakpointsMap = <A>(
  value: ResponsiveValue<A>
): value is BreakpointsMap<A> =>
  typeof value === 'object' && value != null && !Array.isArray(value);
