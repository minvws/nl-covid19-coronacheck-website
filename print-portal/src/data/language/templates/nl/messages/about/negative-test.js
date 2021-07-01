export const negativeTestV2 = `
<p>
    De volgende gegevens zijn opgehaald bij de testlocatie:
</p>
<p>
    Jouw gegevens: <strong>%{discreteInfoString}</strong><br><br>
    Type test: <strong>%{testType}</strong><br>
    Testlocatie: <strong>%{testLocation}</strong><br>
    Testdatum: <strong>%{sampleDate}</strong><br>
    Testuitslag: <strong>negatief (geen corona)</strong><br><br>

    Uniek certificaatnummer:<br>
    <strong>%{identificationCode}</strong>
</p>`;

export const negativeTestV3 = `
<p>
    De volgende gegevens zijn opgehaald bij de testlocatie:
</p>
<p>
    Naam:  <strong>%{name}</strong><br>
    Geboortedatum:  <strong>%{birthDateString}</strong><br><br>

    Type test: <strong>%{testType}</strong><br>
    Testnaam: <strong>%{testName}</strong><br>
    Testdatum: <strong>%{sampleDate}</strong><br>
    Testuitslag: <strong>negatief (geen corona)</strong><br>
    Testlocatie: <strong>%{testLocation}</strong><br>
    Testproducent: <strong>%{manufacturer}</strong><br>
    Getest in: <strong>%{country}</strong><br><br>

    Identificatiecode:<br>
    <strong>%{identificationCode}</strong>
</p>`;
