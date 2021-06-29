const html = `
    <p>
        Deze gegevens van je vaccinatie zijn opgehaald:
    </p>
    <p>
        Naam: <b>%{name}</b><br>
        Geboortedatum: <b>%{birthDateString}</b>
    </p>
    <p>
        Ziekteverwekker: <b>COVID-19</b><br>
        Vaccin: <b>%{vaccineName}</b><br>
        Vaccin type: <b>%{vaccineType}</b><br>
        Producent van het vaccin: <b>%{manufacturer}</b><br>
        Doses: <b>%{dosesString}</b><br>
        Prikdatum: <b>%{dateString}</b><br>
        Gevaccineerd in: <b>%{country}</b><br>
        Uniek certificaatnummer: <b><span class="identificatie-code">%{identificationCode}</span></b>
    </p>
`;

export default html;
