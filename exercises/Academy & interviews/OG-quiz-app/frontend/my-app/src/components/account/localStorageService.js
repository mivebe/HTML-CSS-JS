export const getLocalStorage = (value) => {
    return localStorage.getItem(`${value}`)
}

export const setLocalStorage = (key, value) => {
    return localStorage.setItem(`${key}`, value)
}

export const clearLocalStorage = () => {
    localStorage.clear()
}

export const removeItemLocalStorage = (item) => {
    localStorage.removeItem(`${item}`);
}