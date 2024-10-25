const get = (propertyName: string): unknown => {
    const value = localStorage.getItem(propertyName)
    return value ? JSON.parse(value) : undefined
}

const set = (propertyName: string, value: unknown) => {
    localStorage.setItem(propertyName, JSON.stringify(value))
}

const clear = () => localStorage.clear()

const localStorageService = {
    get,
    set,
    clear,
}

export default localStorageService
