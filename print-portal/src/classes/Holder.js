import numberTool from '@/tools/numbers';
import dateTool from '@/tools/date';

class Holder {
    constructor({
        birthDay = 'XX',
        birthMonth = 'XX',
        firstNameInitial = '-',
        lastNameInitial = '-'
    }) {
        this.birthDay = birthDay;
        this.birthMonth = birthMonth;
        this.firstNameInitial = firstNameInitial;
        this.lastNameInitial = lastNameInitial;
    }

    get string() {
        return this.firstNameInitial + ' ' + this.lastNameInitial + ' ' + numberTool.getLeadingZero(this.birthDay) + ' ' + dateTool.monthNumberToMonthName(Number(this.birthMonth));
    }

    get initials() {
        return this.firstNameInitial + ' ' + this.lastNameInitial;
    }
}

export default Holder;
