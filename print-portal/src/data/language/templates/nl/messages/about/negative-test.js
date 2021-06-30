export const negativeTestV2 = `
<p>
    De volgende gegevens zijn opgehaald bij de testlocatie:
</p>
<p>
    Jouw gegevens: <b>%{discreteInfoString}</b><br><br>
    Type test: <b>%{testType}</b><br>
    Testlocatie: <b>%{testLocation}</b><br>
    Testdatum: <b>%{sampleDate}</b><br>
    Testuitslag: <b>negatief (geen corona)</b><br><br>

    Uniek certificaatnummer:<br>
    <b>%{identificationCode}</b>
</p>`;

export const negativeTestV3 = `
<p>
    De volgende gegevens zijn opgehaald bij de testlocatie:
</p>
<p>
    Naam:  <b>%{name}</b><br>
    Geboortedatum:  <b>%{birthDateString}</b><br><br>

    Type test: <b>%{testType}</b><br>
    Testnaam: <b>%{testName}</b><br>
    Testdatum: <b>%{sampleDate}</b><br>
    Testuitslag: <b>negatief (geen corona)</b><br>
    Testlocatie: <b>%{testLocation}</b><br>
    Testproducent: <b>%{manufacturer}</b><br>
    Getest in: <b>%{country}</b><br><br>

    Identificatiecode:<br>
    <b>%{identificationCode}</b>
</p>`;
