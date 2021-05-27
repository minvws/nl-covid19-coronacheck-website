class NegativeTest {
    constructor({
        sampleDate = '',
        resultDate = '',
        facility = '',
        type = '',
        name = '',
        manufacturer = ''
    }) {
        this.sampleDate = sampleDate;
        this.resultDate = resultDate;
        this.negativeResult = true;
        this.facility = facility;
        this.type = type;
        this.name = name;
        this.manufacturer = manufacturer;
    }
}

export default NegativeTest;
