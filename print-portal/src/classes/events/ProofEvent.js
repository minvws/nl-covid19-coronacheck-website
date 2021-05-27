import Vaccination from './Vaccination';
import NegativeTest from './NegativeTest';

class ProofEvent {
    constructor({
        type = '',
        unique = '',
        isSpecimen = '',
        vaccination = null,
        negativetest = null
    }) {
        this.type = type;
        this.unique = unique;
        this.isSpecimen = isSpecimen;
        this.vaccination = type === 'vaccination' ? new Vaccination(vaccination) : null
        this.negativetest = type === 'negativetest' ? new NegativeTest(negativetest) : null
    }
}

export default ProofEvent;
