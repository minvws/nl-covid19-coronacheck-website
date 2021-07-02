class Recovery {
    constructor({
        sampleDate = '',
        validFrom = '',
        validUntil = ''
    }) {
        this.sampleDate = sampleDate || '';
        this.validFrom = validFrom || '';
        this.validUntil = validUntil || '';
    }
}

export default Recovery;
