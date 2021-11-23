import Vaccination from './Vaccination';
import NegativeTestV2 from './NegativeTestV2';
import NegativeTestV3 from './NegativeTestV3';
import Recovery from './Recovery';
import PositiveTest from './PositiveTest';
import { FilterTypes } from '@/types/filter-types'
class ProofEvent {
    constructor({
        type = '',
        unique = '',
        isSpecimen = '',
        vaccination = null,
        negativetest = null,
        positivetest = null,
        recovery = null,
        protocolVersion = ''
    }) {
        this.type = type || '';
        this.unique = unique || '';
        this.isSpecimen = isSpecimen;
        this.vaccination = type === FilterTypes.VACCINATION ? new Vaccination(vaccination) : null
        this.negativetest = type === FilterTypes.NEGATIVE_TEST ? ((protocolVersion && protocolVersion === '2.0') ? new NegativeTestV2(negativetest) : new NegativeTestV3(negativetest)) : null
        this.positivetest = type === FilterTypes.POSITIVE_TEST ? new PositiveTest(positivetest) : null
        this.recovery = type === FilterTypes.RECOVERY ? new Recovery(recovery) : null
    }
}

export default ProofEvent;
