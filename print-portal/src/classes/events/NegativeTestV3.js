import _Test from './_Test';

class NegativeTest extends _Test {
    constructor(negativetest) {
        super(negativetest);
        this.protocolVersion = '3.0';
        this.negativeResult = true;
    }
}

export default NegativeTest;
