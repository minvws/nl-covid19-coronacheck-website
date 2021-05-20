import Vaccination from './Vaccination';

class ProofEvent {
    constructor({
        type = '',
        unique = '',
        isSpecimen = '',
        vaccination = null
    }) {
        this.type = type;
        this.unique = unique;
        this.isSpecimen = isSpecimen;
        this.vaccination = type === 'vaccination' ? new Vaccination(vaccination) : null
    }
}

export default ProofEvent;
