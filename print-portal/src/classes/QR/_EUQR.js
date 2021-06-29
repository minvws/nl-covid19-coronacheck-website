import dateTool from '@/tools/date';

class _EUQR {
    constructor({
        qr = '',
        dcc = null,
        expirationTime = ''
    }) {
        console.log(dcc, qr);
        this.qr = qr;
        this.dcc = dcc;
        this.expirationTime = expirationTime;
    }

    get fullName() {
        return this.dcc.nam.fn + ', ' + this.dcc.nam.gn;
    }

    get birthDateString() {
        return dateTool.dateToString(this.dcc.dob, 'dd-LL-yyyy');
    }
}

export default _EUQR;
