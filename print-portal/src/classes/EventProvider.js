class EventProvider {
    constructor({
        name = '',
        identifier = '',
        cms = '',
        tls = '',
        unomiUrl = '',
        eventUrl = '',
        usage = []
    }) {
        this.name = name;
        this.provider_identifier = identifier;
        this.cms = cms;
        this.tls = tls;
        this.unomi_url = unomiUrl;
        this.event_url = eventUrl;
        this.usage = usage;
    }
}

export default EventProvider;
