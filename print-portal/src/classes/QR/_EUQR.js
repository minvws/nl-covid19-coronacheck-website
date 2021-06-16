import dateTool from '@/tools/date';
// import numberTools from '@/tools/numbers'

class _EUQR {
    get fullName() {
        return this.JSON.nam.fn + ', ' + this.JSON.nam.gn;
    }

    get birthDateString() {
        return dateTool.dateToString(this.JSON.dob, 'dd-LL-yyyy');
    }
}

export default _EUQR;
