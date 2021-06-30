const recovery = `
<p>
    The following details were retrieved at the test location:
</p>
<p>
    Name:  <b>%{name}</b><br>
    Date of birth:  <b>%{birthDateString}</b><br><br>

    Test date: <b>%{testDate}</b><br>
    Valid from: <b>%{validFrom}</b><br>
    Valid until: <b>%{validUntil}</b><br><br>

    Identification code::<br>
    <b>%{identificationCode}</b>
</p>`;

export default recovery;
