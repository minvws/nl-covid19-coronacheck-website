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
    <p>
        With your vaccination details, the app automatically retrieves a QR code for the Netherlands and one for other countries.
    </p>

    <h3>The Dutch QR-code</h3>
    <p>
        For the Dutch QR code, minimal details are collected. Your details consist of the first letter of your first name, the first letter of your last name, your birth month, and your day of birth.
    </p>
    <p>
        Your details:  S M 06 AUG <!-- TODO -->
    </p>

    <h3>The international QR-code</h3>
    <p>
        These are the details for your international QR code:
    </p>
    <ul>
        <li>Name: <b>%{name}</b></li>
        <li>Date of birth: <b>%{birthDateString}</b></li>
        <li>Vaccine: <b>%{vaccineName}</b></li>
    </ul>
`;

export default html;
