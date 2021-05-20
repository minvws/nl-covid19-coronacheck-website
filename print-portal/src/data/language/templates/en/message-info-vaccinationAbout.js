const html = `
<div class="vaccination-info">
    <div class="vaccination-info__section">
        <h5>TODO! Gegevens voor Nederland</h5>
        <p>
            Voor een Nederlandse QR-code worden er minimale gegevens opgehaald: je vaccinatiedatum en enkele gegevens van jou.
            Jouw gegevens bestaan uit de eerste letter van je voornaam, de eerste letter van je achternaam, je geboortedag en geboortemaand.
        </p>
        <p>
            Jouw gegevens: <b>%{discreteInfoString}</b>
        </p>
    </div>
    <div class="vaccination-info__section">
        <h5>Gegevens voor Europa</h5>
        <p>
            Voor een Europese QR-code zijn meer gegevens nodig, namelijk: .
        </p>
        <p>
            Naam: <b>%{fullName}</b><br>
            Geboortedatum: <b>%{birthDate}</b><br>
            Vaccin: <b>%{vaccin}</b>
        </p>
    </div>
</div>
`;

export default html;
