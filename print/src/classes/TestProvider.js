class TestProvider {
    constructor({
        name = '',
        provider_identifier = '',
        public_key = '',
        result_url = '',
        ssl_cert = ''
    }) {
        this.name = name;
        this.provider_identifier = provider_identifier;
        this.public_key = public_key;
        this.result_url = result_url;
        this.ssl_cert = ssl_cert;
    }
}

export default TestProvider;
