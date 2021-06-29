const html = `
    <p>
        The following details of your vaccination have been retrieved:
    </p>
    <p>
        Name: <strong>%{name}</strong><br>
        Date of birth: <strong>%{birthDateString}</strong>
    </p>
    <p>
        Pathogen: <strong>COVID-19</strong><br>
        Vaccine:  <strong>%{vaccineName}</strong><br>
        Vaccine type:  <strong>%{vaccineType}</strong><br>
        Manufacturer:  <strong>%{manufacturer}</strong><br>
        Doses: <strong>%{dosesString}</strong><br>
        Vaccination date: <strong>%{dateString}</strong><br>
        Country of vaccination: <strong>%{country}</strong><br>
        Identification code: <strong>%{identificationCode}</strong>
    </p>
`;

export default html;
