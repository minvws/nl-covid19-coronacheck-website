import _EUQRtest from './_EUQRtest';
import store from '@/store';
import dateTool from '@/tools/date';

class EUQRnegativetest extends _EUQRtest {
    get credential() {
        return this.dcc.t[0];
    }

    get dateOfTest() {
        return dateTool.dateTimeToString(this.credential.sc);
    }

    get testLocation() {
        return this.credential.tc;
    }

    get testType() {
        const testType = store.getters.getEuTestType(this.credential.tt);
        return testType ? testType.name : '';
    }

    get testName() {
        return this.credential.nm;
    }

    get testManufacturer() {
        const manufacturer = store.getters.getTestManufacturer(this.credential.ma);
        return manufacturer ? manufacturer.name : '';
    }

    get validFrom() {
        return dateTool.dateTimeToString(this.validFromDate, 'dd-MM-yyyy, HH:mm');
    }
}

export default EUQRnegativetest;
