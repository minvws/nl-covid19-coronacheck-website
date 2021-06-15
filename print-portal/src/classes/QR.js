import dateTool from '@/tools/date';
import numberTools from '@/tools/numbers'

class QR {
    constructor({
        data = '',
        attributesIssued = null
    }) {
        this.data = data;
        this.attributesIssued = attributesIssued;
    }

    get initials() {
        return this.attributesIssued.firstNameInitial + '.' + this.attributesIssued.lastNameInitial + '.';
    }

    get birthDateStringShort() {
        return numberTools.getLeadingZero(this.attributesIssued.birthDay) + ' ' + dateTool.monthNumberToMonthNameAbbr(Number(this.attributesIssued.birthMonth));
    }

    get validFrom() {
        return dateTool.dateTimeToString(this.attributesIssued.validFrom);
    }

    get validUntil() {
        const date = dateTool.addHoursToDate(this.attributesIssued.validFrom, Number(this.attributesIssued.validForHours));
        return dateTool.dateTimeToString(date);
    }
}

export default QR;
