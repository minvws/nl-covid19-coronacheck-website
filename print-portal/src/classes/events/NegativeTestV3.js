import _NegativeTest from './_NegativeTest'

class NegativeTest extends _NegativeTest {
    constructor(negativetest) {
        super(negativetest);
        this.protocolVersion = '3.0';
        this.sampleDate = negativetest.sampleDate;
        this.resultDate = negativetest.resultDate;
        this.negativeResult = true;
        this.facility = negativetest.facility;
        this.type = negativetest.type;
        this.name = negativetest.name;
        this.manufacturer = negativetest.manufacturer;
    }
}

export default NegativeTest;
