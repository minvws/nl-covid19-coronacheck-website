import dateTool from '@/tools/date';
import numberTools from '@/tools/numbers'

class NLQR {
    constructor({
        qr = '',
        attributes = null
    }) {
        this.qr = qr;
        this.attributes = attributes;
    }

    get initials() {
        const firstName = (this.attributes.firstNameInitial.length > 0) ? (this.attributes.firstNameInitial + '. ') : ''
        const lastName = (this.attributes.lastNameInitial.length > 0) ? (this.attributes.lastNameInitial + '.') : ''
        return firstName + lastName;
    }

    get validFromDate() {
        return Number(this.attributes.validFrom) * 1000;
    }

    get birthDateStringShort() {
        const birthDayShort = numberTools.isNumeric(this.attributes.birthDay) ? numberTools.getLeadingZero(this.attributes.birthDay) : this.attributes.birthDay;
        const birthMonthShort = numberTools.isNumeric(this.attributes.birthMonth) ? dateTool.monthNumberToMonthNameAbbr(Number(this.attributes.birthMonth)) : this.attributes.birthMonth;
        return birthDayShort + ' ' + birthMonthShort;
    }

    get validFrom() {
        return dateTool.dateTimeToString(this.validFromDate, 'dd-MM-yyyy, HH:mm');
    }

    get validUntil() {
        const date = dateTool.addHoursToDate(this.validFromDate, Number(this.attributes.validForHours));
        return dateTool.dateTimeToString(date, 'dd-MM-yyyy, HH:mm');
    }
}

export default NLQR;
