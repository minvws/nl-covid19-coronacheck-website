import _EUQRtest from './_EUQRtest';// import store from '@/store';
import dateTool from '@/tools/date';

class EUQRrecovery extends _EUQRtest {
    get dateOfTest() {
        return dateTool.dateToString(this.credential.fr);
    }

    get credential() {
        return this.dcc.r[0];
    }

    get validFrom() {
        return dateTool.dateToString(this.credential.df);
    }

    get validUntil() {
        return dateTool.dateToString(this.expirationTime);
    }
}

export default EUQRrecovery;
