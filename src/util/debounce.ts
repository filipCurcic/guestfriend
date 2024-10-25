/**
 * __debounce__
 *
 * Function that delays the execution of the a function until a certain amount of time has passed since the last time it was called
 *
 * @param fn callback function thats executed after the timeout
 * @param ms timeout
 * @returns function
 *
 * @example const debouncedSetSearchTerm = debounce((term: string) => {
        setSearchTerm(term)
    })
 *              
 */

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    ms = 300
) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function (this: any, ...args: Parameters<T>) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}
