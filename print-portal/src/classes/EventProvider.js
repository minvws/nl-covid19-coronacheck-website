class EventProvider {
    constructor({
        name = '',
        provider_identifier = '',
        cms = '',
        tls = '',
        unomi_url = '',
        event_url = '',
        usage = []
    }) {
        this.name = name;
        this.provider_identifier = provider_identifier;
        this.cms = cms;
        this.tls = tls;
        this.unomi_url = unomi_url;
        this.event_url = event_url;
        this.usage = usage;
    }
}

export default EventProvider;
