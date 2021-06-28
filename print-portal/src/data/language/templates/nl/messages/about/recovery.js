const recovery = `
<p>
    De volgende gegevens zijn opgehaald bij de testlocatie:
</p>
<p>
    Naam:  <b>%{name}</b><br>
    Geboortedatum:  <b>%{birthDateString}</b><br><br>

    Testdatum:  <b>%{testDate}</b><br>
    Geldig vanaf:  <b>%{validFrom}</b><br>
    Geldig tot:  <b>%{validUntil}</b><br><br>

    Identificatiecode:<br>
    <b>%{identificationCode}</b>
</p>`;

export default recovery;
