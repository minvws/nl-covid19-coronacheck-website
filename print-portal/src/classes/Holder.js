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

    get birthDayString() {
        return numberTool.getLeadingZero(this.birthDay) + ' ' + dateTool.monthNumberToMonthName(Number(this.birthMonth));
    }

    get string() {
        return this.firstNameInitial + ' ' + this.lastNameInitial + ' ' + this.birthDayString;
    }

    get initials() {
        return this.firstNameInitial + ' ' + this.lastNameInitial;
    }
}

export default Holder;
