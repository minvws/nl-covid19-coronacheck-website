const html = `
    <p>
        De volgende vaccinatie gegevens zijn opgehaald:
    </p>
    <p>
        Naam: <b>%{name}</b><br>
        Geboortedatum: <b>%{birthDateString}</b>
    </p>
    <p>
        Ziekteverwekker: <b>COVID-19</b><br>
        Vaccin:  <b>%{vaccineName}</b><br>
        Vaccin type:  <b>%{vaccineType}</b><br>
        Producent:  <b>%{manufacturer}</b><br>
        Doses: <b>%{doseNumber} van %{totalDoses}</b><br>
        Prikdatum: <b>%{dateString}</b><br>
        Land van vaccinatie: <b>%{country}</b><br>
        Identificatiecode: <b>%{identificationCode}</b>
    </p>
    <!-- <p>
        Met jouw vaccinatiegegevens haalt de app automatisch een Nederlandse en een internationale QR-code voor je op.
    </p>
    <h3>De Nederlandse QR-code</h3>
    <p>
        Voor de Nederlandse QR-code worden minimale gegevens opgehaald. Jouw gegevens bestaan uit de eerste letter van je voornaam, de eerste letter van je achternaam, je geboortedag en geboortemaand.
    </p>
    <p>
        Jouw gegevens: S M 06 AUG <!-- TODO -->
    </p>
    <h3>De internationale QR-code</h3>
    <p>
        Dit zijn de gegevens voor je internationale QR-code:
    </p>
    <ul>
        <li>Naam: <b>%{name}</b></li>
        <li>Geboortedatum: <b>%{birthDateString}</b></li>
        <li>Vaccin: <b>%{vaccineName}</b></li>
    </ul> -->
`;

export default html;
