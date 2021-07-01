class NegativeTestV2 {
    constructor(negativetest) {
        this.protocolVersion = '2.0';
        this.negativeResult = negativetest.negativeResult;
        this.sampleDate = negativetest.sampleDate;
        this.testType = negativetest.testType;
    }
}

export default NegativeTestV2;
