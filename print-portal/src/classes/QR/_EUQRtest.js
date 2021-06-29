import _EUQR from './_EUQR';

class _EUQRtest extends _EUQR {
    get countryOfTest() {
        return this.credential.co;
    }

    get certificateIssuer() {
        return this.credential.is;
    }
}

export default _EUQRtest;
