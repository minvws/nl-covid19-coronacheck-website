import { format } from 'date-fns';
import { nl, enGB } from 'date-fns/locale';
import i18n from '@/i18n'

const monthNumberToMonthNameAbbr = (n) => {
    return i18n.t('date.months.abbr.' + (n - 1))
}

const dateToMonthName = (dateInput, localeString) => {
    return format(new Date(dateInput), 'MMMM', { locale: getLocale(localeString) });
}

const isValidDateString = (string) => {
    const isNumeric = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    return isNumeric(new Date(string).getTime());
}

const dateToString = (dateInput, formatType = 'date-with-day', localeString) => {
    let dateFormat;
    switch (formatType) {
    case 'date-with-day':
        dateFormat = 'EEEE d LLLL yyyy';
        break;
    case 'date-without-day':
        dateFormat = 'd LLLL yyyy';
        break;
    case 'datetime-with-day':
        dateFormat = 'EEEE d LLLL HH:mm';
        break;
    }
    return format(new Date(dateInput), dateFormat, { locale: getLocale(localeString) });
}

const getTime = (dateString) => {
    return new Date(dateString).getTime();
}

const getLocale = (localeString) => {
    switch (localeString) {
    case 'en':
        return enGB;
    default:
        return nl;
    }
}

export default {
    monthNumberToMonthNameAbbr,
    dateToMonthName,
    dateToString,
    isValidDateString,
    getTime
}
