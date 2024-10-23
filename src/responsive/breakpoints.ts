import { BreakpointsEnum } from './responsive.types';

export const breakpoints = {
  [BreakpointsEnum.sm]: 0,
  [BreakpointsEnum.md]: 768,
  [BreakpointsEnum.lg]: 1280,
  [BreakpointsEnum.xl]: 1720,
} as const;
