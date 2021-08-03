import dateTool from '@/tools/date';
import _Holder from './_Holder';
import store from '@/store';

class HolderV3 extends _Holder {
    constructor({
        firstName = '',
        infix = '',
        lastName = '',
        birthDate = ''
    }) {
        super()
        this.protocolVersion = '3.0';
        this.firstName = firstName;
        this.infix = infix;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    get fullName() {
        if (this.infix) {
            return this.infix + ' ' + this.lastName + ', ' + this.firstName;
        } else {
            return this.lastName + ', ' + this.firstName;
        }
    }

    get firstNameInitial() {
        return this.firstName[0];
    }

    get lastNameInitial() {
        return this.lastName[0];
    }

    get birthDateString() {
        if (dateTool.isValidDateString(this.birthDate)) {
            return dateTool.dateToString(this.birthDate, 'date-without-day', store.state.languages.current.locale);
        } else {
            return this.birthDate;
        }
    }

    get birthDayStyled() {
        return this.birthDate.split('-')[2]
    }

    get birthMonthStyled() {
        return dateTool.monthNumberToMonthNameAbbr(Number(this.birthDate.split('-')[1]));
    }

    get birthDateStringShort() {
        return this.birthDayStyled + ' ' + this.birthMonthStyled;
    }
}

export default HolderV3;
