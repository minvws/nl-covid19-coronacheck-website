const html = `
    <p>
        Deze gegevens van je vaccinatie zijn opgehaald:
    </p>
    <p>
        Naam: <strong>%{name}</strong><br>
        Geboortedatum: <strong>%{birthDateString}</strong>
    </p>
    <p>
        Ziekteverwekker: <strong>COVID-19</strong><br>
        Vaccin: <strong>%{vaccineName}</strong><br>
        Vaccin type: <strong>%{vaccineType}</strong><br>
        Producent van het vaccin: <strong>%{manufacturer}</strong><br>
        Doses: <strong>%{dosesString}</strong><br>
        Prikdatum: <strong>%{dateString}</strong><br>
        Gevaccineerd in: <strong>%{country}</strong><br>
        Identificatiecode: <strong><span class="identificatie-code">%{identificationCode}</span></strong>
    </p>
`;

export default html;
