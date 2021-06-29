import EUQR from './_EUQR';
import store from '@/store';
import dateTool from '@/tools/date';

class EUQRvaccination extends EUQR {
    get credential() {
        return this.dcc.v[0];
    }

    get vaccineBrand() {
        const brand = store.getters.getEuBrand(this.credential.mp);
        return brand ? brand.name : '-';
    }

    get vaccineManufacturer() {
        const manufacturer = store.getters.getVaccineManufacturer(this.credential.ma);
        return manufacturer ? manufacturer.name : '-';
    }

    get vaccineType() {
        const vaccineType = store.getters.getVaccineType(this.credential.vp);
        return vaccineType ? vaccineType.name : '-';
    }

    get doseNumber() {
        return this.credential.dn;
    }

    get totalDoses() {
        return this.credential.sd;
    }

    get vaccinationDate() {
        return dateTool.dateToString(this.credential.dt);
    }

    get vaccinationCountry() {
        return this.credential.co;
    }

    get certificateIssuer() {
        return this.credential.is
    }

    get certificateIdentifier() {
        return this.credential.ci
    }

    get validFrom() {
        return '??? TODO ???'
    }
}

export default EUQRvaccination;
