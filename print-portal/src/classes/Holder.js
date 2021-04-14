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

    get birthDayStyled() {
        return numberTool.getLeadingZero(this.birthDay);
    }

    get birthDayMonthStyled() {
        return dateTool.monthNumberToMonthName(Number(this.birthMonth));
    }

    get birthDayString() {
        return this.birthDayStyled + ' ' + this.birthDayMonthStyled;
    }

    get string() {
        return this.firstNameInitial + ' ' + this.lastNameInitial + ' ' + this.birthDayString;
    }

    get stringCompact() {
        return this.firstNameInitial + this.lastNameInitial + this.birthDayString;
    }

    get initials() {
        return this.firstNameInitial + ' ' + this.lastNameInitial;
    }
}

export default Holder;
