class EventProvider {
    constructor({
        name = '',
        identifier = '',
        cms = '',
        tls = '',
        unomiUrl = '',
        eventUrl = '',
        usage = [],
        auth = []
    }) {
        this.name = name;
        this.provider_identifier = identifier;
        this.cms = cms;
        this.tls = tls;
        this.unomi_url = unomiUrl;
        this.event_url = eventUrl;
        this.usage = usage;
        this.auth = auth;
    }
}

export default EventProvider;
