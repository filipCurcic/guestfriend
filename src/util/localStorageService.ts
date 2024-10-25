/**
 * __localStorageService.get__
 *
 * Function that returns the value of a localStorage item based on the propertyName key
 *
 * @param propertyName name of the localStorage object
 * @returns JSON.parsed value or undefined
 *
 * @example const item = localStorageService.get(key)
 *
 */
const get = (propertyName: string): unknown => {
    const value = localStorage.getItem(propertyName)
    return value ? JSON.parse(value) : undefined
}

/**
 * __localStorageService.set__
 *
 * Function that sets an item to localStorage
 *
 * @param propertyName name of the localStorage object
 * @param value value of the object
 *
 * @example localStorageService.set('someKey', 'someValue')
 *
 */
const set = (propertyName: string, value: unknown) => {
    localStorage.setItem(propertyName, JSON.stringify(value))
}

const localStorageService = {
    get,
    set,
}

export default localStorageService
