class TestProvider {
    constructor ({ name, identifier, tls, url, usage, cms }) {
        this.name = name;
        this.provider_identifier = identifier
        this.tls = tls;
        this.result_url = url;
        this.usage = usage;
        this.cms = cms
    }
}

export default TestProvider;
