import { format, addHours } from 'date-fns';
import { nl, en } from 'date-fns/locale';

const monthNumberToMonthName = (n) => {
    const months = ['JAN', 'FEB', 'MRT', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC']
    return months[(n - 1)];
}

const dateToString = (dateString, dateFormat = 'dd-MM-yyyy HH:mm', locale) => {
    switch (locale) {
    case 'en':
        locale = en;
        break;
    default:
        locale = nl;
        break;
    }
    return format(new Date(dateString), dateFormat, { locale });
}

const addHoursToDate = (dateString, hours, formatted) => {
    const newDate = addHours(new Date(dateString), hours);
    return formatted ? dateToString(newDate) : newDate;
}

export default {
    monthNumberToMonthName,
    dateToString,
    addHoursToDate
}
