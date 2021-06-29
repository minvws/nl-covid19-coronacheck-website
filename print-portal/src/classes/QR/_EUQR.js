import dateTool from '@/tools/date';

class _EUQR {
    constructor({
        qr = '',
        dcc = null,
        expirationTime = ''
    }) {
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

    get certificateNumber() {
        return this.credential.ci
    }

    get validUntil() {
        return dateTool.dateTimeToString(this.expirationTime, 'dd-MM-yyyy, HH:mm');
    }
}

export default _EUQR;
