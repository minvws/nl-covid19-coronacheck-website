class SignedEvent {
    constructor({
        holder = null,
        event = null,
        providerIdentifier = null
    }) {
        this.holder = holder;
        this.event = event;
        this.providerIdentifier = providerIdentifier;
    }
}

export default SignedEvent;
