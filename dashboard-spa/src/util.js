/**
 * @param {string} locale
 * @return {(number: number) => string}
 */
export function createNumberFormatter(locale) {
    if (typeof Intl !== 'undefined') {
        const formatter = new Intl.NumberFormat(locale);
        return (number) => formatter.format(number);
    }
    return (number) => number;
}

/**
 * @param {string} date - Date formatted as dd-mm-yyyy
 * @param {number} days - Number of days to subtract
 * @return {string} Date formatted as dd-mm-yyyy
 */
export function subtractDays(dateString, days) {
    const date = parseLocalDate(dateString);
    date.setDate(date.getDate() - days);
    return formatLocalDate(date);
}

const DATE_PATTERN = /^(\d{2})-(\d{2})-(\d{4})$/;

/**
 * @param {string} date - Date formatted as dd-mm-yyyy
 * @return {Date}
 */
function parseLocalDate(dateString) {
    const matches = dateString.match(DATE_PATTERN);
    if (matches) {
        return new Date(
            matches[3] + '-' + matches[2] + '-' + matches[1] + 'T00:00'
        );
    }
    throw new Error(
        'Date string does not match pattern dd-mm-yyyy: ' + dateString
    );
}

/**
 * @param {Date} date
 * @return {string} Date formatted as dd-mm-yyyy
 */
function formatLocalDate(date) {
    return (
        str(date.getDate()) +
        '-' +
        str(date.getMonth()) +
        '-' +
        str(date.getFullYear())
    );
}

function str(num) {
    return num < 10 ? '0' + num : String(num);
}
