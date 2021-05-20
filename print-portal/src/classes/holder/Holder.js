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

    get birthDateString() {
        return dateTool.dateToString(this.birthDate, 'dd LLLL yyyy');
    }

    get birthDateStringShort() {
        return this.birthDate.split('-')[2] + ' ' + dateTool.monthNumberToMonthNameAbbr(Number(this.birthDate.split('-')[1]));
    }

    get discreteInfoString() {
        return this.firstName[0] + ' ' + this.lastName[0] + ' ' + this.birthDateStringShort;
    }
}

export default Holder;
