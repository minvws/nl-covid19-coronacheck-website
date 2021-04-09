import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

const monthNumberToMonthName = (n) => {
    const months = ['JAN', 'FEB', 'MRT', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC']
    return months[(n - 1)];
}

const dateToString = (dateString, dateFormat = 'dd-MM-yyyy hh:mm') => {
    return format(new Date(dateString), dateFormat, { locale: nl });
}

export default {
    monthNumberToMonthName,
    dateToString
}
