const html = `
    <p>
        De volgende vaccinatie gegevens zijn opgehaald:
    </p>
    <p>
        Naam: <b>%{name}</b><br>
        Geboortedatum: <b>%{birthDateString}</b><br>
    </p>
    <p>
        Vaccin:  <b>%{vaccineName}</b><br>
        Producent van het vaccin:  <b>%{manufacturer}</b><br>
        Doses: <b>%{doseNumber} van %{totalDoses}</b><br>
        Prikdatum: <b>%{dateString}</b><br>
        Land van vaccinatie: <b>%{country}</b>
    </p>
`;

export default html;
