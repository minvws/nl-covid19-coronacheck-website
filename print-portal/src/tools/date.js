// todo something with languages
const monthNumberToMonthName = (n) => {
    const months = ['JAN', 'FEB', 'MRT', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC']
    return months[(n - 1)];
}

const dateToString = (date) => {
    // todo make string nicer. Use library?
    return date.toLocaleString();
}

export default {
    monthNumberToMonthName,
    dateToString
}
