class SignedEvent {
    constructor({
        holder = null,
        event = null
    }) {
        this.holder = holder;
        this.event = event
    }
}

export default SignedEvent;
