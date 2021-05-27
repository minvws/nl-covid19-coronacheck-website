import dateTool from '@/tools/date';

class Holder {
    constructor({
        firstName = '',
        infix = '',
        lastName = '',
        birthDate = ''
    }) {
        this.firstName = firstName;
        this.infix = infix;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }

    get fullName() {
        return this.infix + ' ' + this.lastName + ', ' + this.firstName[0];
    }

    get firstNameInitial() {
        return this.firstName[0];
    }

    get lastNameInitial() {
        return this.lastName[0];
    }

    get birthDateString() {
        return dateTool.dateToString(this.birthDate, 'dd LLLL yyyy');
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

    get discreteInfoString() {
        return this.firstNameInitial + ' ' + this.lastNameInitial + ' ' + this.birthDateStringShort;
    }
}

export default Holder;
