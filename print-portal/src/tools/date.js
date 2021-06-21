import { format, addHours } from 'date-fns';
import { nl, en } from 'date-fns/locale';
import i18n from '@/i18n'

const monthNumberToMonthNameAbbr = (n) => {
    return i18n.t('date.months.abbr.' + (n - 1))
}

const isValidDateString = (string) => {
    const isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    return isNumeric(new Date(string).getTime());
}

const dateToString = (dateInput, dateFormat = 'dd-MM-yyyy', locale) => {
    switch (locale) {
    case 'en':
        locale = en;
        break;
    default:
        locale = nl;
        break;
    }
    return format(new Date(dateInput), dateFormat, { locale });
}

const dateTimeToString = (dateInput, dateFormat = 'dd-MM-yyyy HH:mm', locale) => {
    switch (locale) {
    case 'en':
        locale = en;
        break;
    default:
        locale = nl;
        break;
    }
    return format(new Date(dateInput), dateFormat, { locale });
}

const addHoursToDate = (dateInput, hours, formatted) => {
    const newDate = addHours(new Date(dateInput), hours);
    return formatted ? dateTimeToString(newDate) : newDate;
}

const getTime = (dateString) => {
    return new Date(dateString).getTime();
}

export default {
    monthNumberToMonthNameAbbr,
    dateToString,
    dateTimeToString,
    addHoursToDate,
    isValidDateString,
    getTime
}
