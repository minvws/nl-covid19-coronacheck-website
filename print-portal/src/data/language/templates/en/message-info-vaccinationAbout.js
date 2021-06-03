const html = `
    <p>
        TODO EN De volgende vaccinatie gegevens zijn opgehaald:
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
        Doses: <b>%{doseNumber} of %{totalDoses}</b><br>
        Prikdatum: <b>%{dateString}</b><br>
        Land van vaccinatie: <b>%{country}</b><br>
        Identificatiecode: <b>%{identificationCode}</b>
    </p>
`;

export default html;
