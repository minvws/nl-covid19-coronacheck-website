export const negativeTestV2 = `
<p>
    The following details were retrieved at the test location:
</p>
<p>
    Your details: <b>%{discreteInfoString}</b><br>
    Test type: <b>%{testType}</b><br>
    Test location: <b>%{testLocation}</b><br>
    Test date: <b>%{sampleDate}</b><br>
    Test result: <b>negatief (geen corona)</b><br>
    Identification code: <b>%{identificationCode}</b>
</p>`;

export const negativeTestV3 = `
<p>
    The following details were retrieved at the test location:
</p>
<p>
    Name:  <b>%{name}</b><br>
    Date of birth:  <b>%{birthDateString}</b><br>
    Type test: <b>%{testType}</b><br>
    Test name: <b>%{testName}</b><br>
    Test date: <b>%{sampleDate}</b><br>
    Test result:: <b>negatief (geen corona)</b><br>
    Test location: <b>%{testLocation}</b><br>
    Test manufacturer: <b>%{manufacturer}</b><br>
    Identification code: <b>%{identificationCode}</b>
</p>`;
