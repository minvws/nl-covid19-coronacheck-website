export const cmsDecode = (encoded) => {
    return JSON.parse(atob(encoded));
}
