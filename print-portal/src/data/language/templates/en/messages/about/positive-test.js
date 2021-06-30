const positiveTest = `
<p>
    The following details were retrieved at the test location:
</p>
<p>
    Name:  <b>%{name}</b><br>
    Date of birth:  <b>%{birthDateString}</b><br><br>

    Type test: <b>%{testType}</b><br>
    Test name: <b>%{testName}</b><br>
    Test date: <b>%{sampleDate}</b><br>
    Test result: <b>positive (corona)</b><br>
    Test location: <b>%{testLocation}</b><br>
    Test manufacturer: <b>%{manufacturer}</b><br>
    Tested in: <b>%{country}</b><br><br>

    Identification code:<br>
    <b>%{identificationCode}</b>
</p>`;

export default positiveTest;
