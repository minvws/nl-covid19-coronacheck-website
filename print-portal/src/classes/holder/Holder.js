// import numberTool from '@/tools/numbers';
// import dateTool from '@/tools/date';

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

    // get birthDayStyled() {
    //     return numberTool.getLeadingZero(this.birthDay);
    // }
    //
    // get birthDayMonthStyled() {
    //     return dateTool.monthNumberToMonthNameAbbr(Number(this.birthMonth));
    // }
    //
    // get birthDayString() {
    //     return this.birthDayStyled + ' ' + this.birthDayMonthStyled;
    // }
    //
    // get string() {
    //     return this.firstNameInitial + ' ' + this.lastNameInitial + ' ' + this.birthDayString;
    // }
    //
    // get stringCompact() {
    //     return this.firstNameInitial + this.lastNameInitial + this.birthDayString;
    // }
    //
    // get initials() {
    //     return this.firstNameInitial + ' ' + this.lastNameInitial;
    // }
}

export default Holder;
