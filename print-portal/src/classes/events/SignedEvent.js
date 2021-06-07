import HolderV3 from '../holder/HolderV3';
import ProofEvent from './ProofEvent';

class SignedEvent {
    constructor({
        holder = null,
        event = null
    }) {
        this.holder = new HolderV3(holder);
        this.event = new ProofEvent(event)
    }
}

export default SignedEvent;
