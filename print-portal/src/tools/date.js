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
    let dateFormat, dateInputCorrected;
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
    case 'datetime-with-year-and-day':
        dateFormat = 'EEEE d LLLL yyyy HH:mm';
        break;
    }
    if (dateInput.length < 11) {
        // When a ISO8601 without time is entered in new Date(), it will interpret it as UTC time
        // and will format it corresponding the timezone, resulting in unexpected dates for specific timezones
        dateInputCorrected = dateInput + 'T00:00';
    } else {
        dateInputCorrected = dateInput;
    }
    return format(new Date(dateInputCorrected), dateFormat, { locale: getLocale(localeString) });
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
