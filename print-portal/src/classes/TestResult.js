import HolderV2 from './holder/HolderV2';

class TestResult {
    constructor({
        unique = '',
        holder = null,
        negativeResult = false,
        sampleDate = null,
        testType = ''
    }) {
        this.unique = unique;
        this.holder = new HolderV2(holder);
        this.negativeResult = negativeResult;
        this.sampleDate = sampleDate;
        this.testType = testType;
    }
}

export default TestResult;
