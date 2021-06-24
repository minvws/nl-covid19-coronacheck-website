import _Holder from './_Holder';
import dateTool from '@/tools/date';
import numberTools from '@/tools/numbers'

class HolderV2 extends _Holder {
    constructor({
        birthDay = 'XX',
        birthMonth = 'XX',
        firstNameInitial = '-',
        lastNameInitial = '-'
    }) {
        super();
        this.protocolVersion = '2.0';
        this.birthDay = birthDay;
        this.birthMonth = birthMonth;
        this.firstNameInitial = firstNameInitial;
        this.lastNameInitial = lastNameInitial;
    }

    get birthDayStyled() {
        return numberTools.getLeadingZero(this.birthDay);
    }

    get birthMonthStyled() {
        return dateTool.monthNumberToMonthNameAbbr(Number(this.birthMonth));
    }

    get birthDateStringShort() {
        return this.birthDayStyled + ' ' + this.birthMonthStyled;
    }

    get string() {
        return this.firstNameInitial + ' ' + this.lastNameInitial + ' ' + this.birthDayString;
    }

    get initials() {
        return this.firstNameInitial + ' ' + this.lastNameInitial;
    }
}

export default HolderV2;
