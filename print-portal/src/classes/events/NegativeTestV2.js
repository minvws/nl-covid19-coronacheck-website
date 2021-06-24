import _NegativeTest from './_NegativeTest'

class NegativeTestV2 extends _NegativeTest {
    constructor(negativetest) {
        super(negativetest);
        this.protocolVersion = '2.0';
        this.negativeResult = negativetest.negativeResult;
        this.sampleDate = negativetest.sampleDate;
        this.testType = negativetest.testType;
    }
}

export default NegativeTestV2;
