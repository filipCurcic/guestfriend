export type Predefined<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ResponsiveValue<V> = V | BreakpointsMap<V>
export type BreakpointsMap<V> = {
    [breakpoint: number]: V
}

export enum BreakpointsEnum {
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
}
