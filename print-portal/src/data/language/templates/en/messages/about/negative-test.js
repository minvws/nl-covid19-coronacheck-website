export const negativeTestV2 = `
<p>
    The following details were retrieved at the test location:
</p>
<p>
    Your details: <strong>%{discreteInfoString}</strong><br>
    Test type: <strong>%{testType}</strong><br>
    Test location: <strong>%{testLocation}</strong><br>
    Test date: <strong>%{sampleDate}</strong><br>
    Test result: <strong>negatief (geen corona)</strong><br>
    Unique certificate identifier: <strong>%{identificationCode}</strong>
</p>`;

export const negativeTestV3 = `
<p>
    The following details were retrieved at the test location:
</p>
<p>
    Name:  <strong>%{name}</strong><br>
    Date of birth:  <strong>%{birthDateString}</strong><br>
    Type test: <strong>%{testType}</strong><br>
    Test name: <strong>%{testName}</strong><br>
    Test date: <strong>%{sampleDate}</strong><br>
    Test result: <strong>negative (no corona)</strong><br>
    Test location: <strong>%{testLocation}</strong><br>
    Test manufacturer: <strong>%{manufacturer}</strong><br>
    Identification code: <strong>%{identificationCode}</strong>
</p>`;
