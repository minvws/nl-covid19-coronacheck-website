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
        return [this.firstName, this.infix, this.lastName].join(' ');
    }

    get birthDateString() {
        return dateTool.dateToString(this.birthDate, 'dd LLLL yyyy');
    }
}

export default Holder;
