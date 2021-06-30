const positiveTest = `
<p>
    De volgende gegevens zijn opgehaald bij de testlocatie:
</p>
<p>
    Naam:  <b>%{name}</b><br>
    Geboortedatum:  <b>%{birthDateString}</b><br><br>

    Type test: <b>%{testType}</b><br>
    Testnaam: <b>%{testName}</b><br>
    Testdatum: <b>%{sampleDate}</b><br>
    Testuitslag: <b>positief (corona)</b><br>
    Testlocatie: <b>%{testLocation}</b><br>
    Testproducent: <b>%{manufacturer}</b><br>
    Getest in: <b>%{country}</b><br><br>

    Uniek certificaatnummer:<br>
    <b>%{identificationCode}</b>
</p>`;

export default positiveTest;
