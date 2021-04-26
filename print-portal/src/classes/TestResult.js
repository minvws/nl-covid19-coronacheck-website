import Holder from './Holder';

class TestResult {
    constructor({
        unique = '',
        holder = null,
        negativeResult = false,
        sampleDate = null,
        testType = ''
    }) {
        this.unique = unique;
        this.holder = new Holder(holder);
        this.negativeResult = negativeResult;
        this.sampleDate = sampleDate;
        this.testType = testType;
    }
}

export default TestResult;
