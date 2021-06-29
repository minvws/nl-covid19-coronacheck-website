import _EUQR from './_EUQR';
import store from '@/store';
import dateTool from '@/tools/date';

class EUQRnegativetest extends _EUQR {
    get credential() {
        return this.dcc.t[0];
    }

    get testType() {
        const testType = store.getters.getEuTestType(this.credential.tt);
        return testType ? testType.name : '';
    }

    get testName() {
        return this.credential.nm;
    }

    get dateOfTest() {
        return dateTool.dateTimeToString(this.credential.sc);
    }

    get testLocation() {
        return this.credential.tc;
    }

    get testManufacturer() {
        const manufacturer = store.getters.getTestManufacturer(this.credential.ma);
        return manufacturer ? manufacturer.name : '';
    }

    get countryOfTest() {
        return this.credential.co;
    }

    get certificateIssuer() {
        return this.credential.is;
    }

    get validFrom() {
        return dateTool.dateTimeToString(this.validFromDate, 'dd-MM-yyyy, HH:mm');
    }
}

export default EUQRnegativetest;
