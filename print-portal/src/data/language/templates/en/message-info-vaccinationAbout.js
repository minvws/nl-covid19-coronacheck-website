const html = `
    <p>
        The following details of your vaccination have been retrieved:
    </p>
    <p>
        Name: <b>%{name}</b><br>
        Date of birth: <b>%{birthDateString}</b>
    </p>
    <p>
        Pathogen: <b>COVID-19</b><br>
        Vaccine:  <b>%{vaccineName}</b><br>
        Vaccine type:  <b>%{vaccineType}</b><br>
        Manufacturer:  <b>%{manufacturer}</b><br>
        Doses: <b>%{doseNumber} of %{totalDoses}</b><br>
        Vaccination date: <b>%{dateString}</b><br>
        Country of vaccination: <b>%{country}</b><br>
        Identification code: <b>%{identificationCode}</b>
    </p>
    <p>With your vaccination details, the app automatically retrieves a Dutch and a European QR code for you.</p>
`;

export default html;
