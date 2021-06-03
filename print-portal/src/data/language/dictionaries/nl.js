import messageInfoTestResultAbout from './../templates/nl/message-info-testResultAbout';
import footer from './../templates/nl/footer';

const nl = {
    'date': {
        'months': {
            'abbr': ['JAN', 'FEB', 'MAA', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC']
        }
    },
    'template': { footer },
    'message': {
        'info': {
            'testResultAbout': {
                'head': 'Over de testuitslag',
                'body': messageInfoTestResultAbout
            },
            'testResultSomethingWrong': {
                'head': 'Kloppen de gegevens niet?',
                'body': messageInfoTestResultAbout
            }
        },
        'error': {}
    },
    'pdf': {
        'dayOfBirth': 'Geboortedag',
        'footerText': `Bekijk de meestgestelde vragen op www.CoronaCheck.nl

Stuur een e-mail naar helpdesk@coronacheck.nl of bel naar 0800-1421 (gratis)`,
        'initials': 'Initialen',
        'instructions': 'INSTRUCTIES',
        'instructionsText': `1. Print dit testbewijs op A4 zonder de schaal aan te passen (mag in zwart-wit)

2. Neem een geldig identiteitsbewijs mee naar de activiteit

3. Laat het testbewijs en je identiteitsbewijs (en eventueel ook je toegangskaartje) zien bij de ingang

Let op: dit is géén toegangsticket voor je activiteit`,
        'preferMobile': 'Laat je jouw testbewijs liever op je telefoon zien? Gebruik dan de code uit de e-mail in de CoronaCheck-app',
        'questions': 'VRAGEN?',
        'testedAt': 'Getest op',
        'yourTestProof': 'Je testbewijs',
        'validUntil': 'Geldig tot'
    },
    'image': {
        'holder': {
            'overview': 'Mijn overzicht',
            'showQrIntro': 'Laat zowel de QR-code als je identiteitsbewijs zien bij de ingang van de locatie die je bezoekt.',
            'myQr': 'Mijn QR-code',
            'validText': 'Geldig tot donderdag<br>11 maart 14:06',
            'showQr': 'Toon QR'
        }
    },
    'back': 'Terug',
    'changeLanguage': 'Wissel van taal',
    'close': 'Sluiten',
    'createTestProof': 'Maak QR-code',
    'currentLanguage': 'Huidige taal',
    'dateOfTest': 'Testdatum',
    'didNotGetCode': 'Ik heb geen code gekregen',
    'emptyTestCode': 'Ophaalcode niet ingevuld',
    'enterCode': 'Testuitslag ophalen',
    'expiredTestCodeHead': 'De ophaalcode is verlopen',
    'expiredTestCodeBody': '<p>De code die je invult is niet meer geldig. Controleer of je de juiste code hebt ingevuld. Nieuwe code nodig? Laat je dan opnieuw testen.</p>',
    'faq': 'Meestgestelde vragen',
    'forInstanceAbbr': 'Bijv.',
    'generalError': 'Sorry, er gaat iets mis',
    'generalErrorBody': '<p>Dat komt door een technische fout. Neem contact op met de helpdesk van CoronaCheck via <a href="tel:0800-1421" class="only-clickable-for-mobile">0800-1421</a>.</p>',
    'goBackToStart': 'Naar home',
    'invalidTestCode': 'Geen geldige ophaalcode',
    'invalidVerificationCode': 'Geen geldige verificatiecode',
    'language': 'Taal',
    'next': 'Volgende',
    'noTestProofPresent': 'Er is nog geen testbewijs',
    'noTestProofPresentDirection': 'Je kunt alleen van een negatieve testuitslag een testbewijs maken. Haal eerst je testuitslag op.',
    'noTestResultPresent': 'Er is geen testuitslag bekend',
    'noTestResultPresentDirection': 'Haal eerst je testuitslag op. Gebruik hiervoor de code die je van de testlocatie hebt gekregen. ',
    'noVerificationCodeHead': 'Nieuwe verificatiecode nodig?',
    'noVerificationCodeMessage': '<p>Je krijgt de verificatiecode via een sms of e-mail van de testlocatie. Niet gekregen? Dan kunnen we een nieuwe code sturen.</p>',
    'preferMobile': 'Liever je testbewijs op je mobiel?',
    'preferMobileDirection': 'Download dan de app.',
    'printPortalHomeBodyText': '<p>Een testbewijs op papier is handig als je geen smartphone hebt. Dit is hoe het werkt:</p><h3>Alleen toegang na testen</h3><p>Laat je daarom testen als je bepaalde locaties of activiteiten bezoekt. Ook als je al gevaccineerd bent. Blijkt uit de test dat je geen corona hebt (negatieve testuitslag)? Dan krijg je toegang.</p><h3>Jouw QR-code op zak</h3><p>Als uit de test blijkt dat je geen corona hebt kun je in de app of op papier een persoonlijke QR-code maken. Dat is jouw testbewijs. De QR-code wordt gescand voordat je toegang krijgt. Zorg dat jouw QR-code binnen 40 uur na het moment van testen gescand is bij de ingang.</p><h3>Zo min mogelijk gegevens</h3><p>In jouw QR-code staan alleen je negatieve testuitslag (geen corona), het tijdstip van de test en minimale gegevens: de eerste letter van je voornaam, de eerste letter van je achternaam, je geboortedag en geboortemaand. Dit is ter controle, om zeker te zijn dat de testuitslag bij jou hoort.</p>',
    'printPortalHomeHeader': 'Krijg toegang met een papieren testbewijs',
    'retrieveTestResult': 'Testuitslag ophalen',
    'sendCode': 'Stuur code',
    'sendAgain': 'Verstuur opnieuw',
    'testCodeDirection': 'Vul jouw ophaalcode in. Deze heb je van de testlocatie gekregen. Of klik op de link in de e-mail die je van je testlocatie krijgt.',
    'uniqueCode': 'Ophaalcode',
    'retrievedTestResult': 'Opgehaalde testuitslag',
    'resultNegative': 'Negatieve testuitslag',
    'resultPending': 'Testuitslag nog niet bekend',
    'resultPendingDirection': 'Probeer het later nog eens.<br>Neem voor vragen contact op met jouw testlocatie.',
    'somethingIsWrong': 'Klopt er iets niet?',
    'openPDF': 'Open PDF',
    'userConsentText': 'Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank" rel="noopener noreferrer">privacyverklaring</a> gelezen en begrijp hoe CoronaCheck met mijn gegevens omgaat.',
    'verificationCode': 'Verificatiecode',
    'verificationCodeDirection': 'Je krijgt een code in een sms of e-mail',
    'yourCredentials': 'Jouw gegevens',
    'yourCredentialsWrong': 'Zijn deze gegevens anders dan op je identiteitsbewijs?',
    'yourCredentialsWrongDirection': 'Neem contact op met je testlocatie. Zij kunnen je gegevens aanpassen.',
    'yourNegativeTestresult': 'Controleer je testuitslag',
    'yourNegativeTestresultDirection': '<p>Deze testuitslag is opgehaald bij de testlocatie.</p><p>Kloppen de gegevens hieronder? Dan kun je van de negatieve testuitslag een QR-code maken. Dat is jouw bewijs.</p>',
    'yourTestProof': 'Jouw testbewijs',
    'yourTestProofDirection': 'Je hebt een testbewijs gemaakt, in de vorm van een QR-code. Lees hier wat er in staat. Open of download de PDF, print het uit en neem ’m mee.',
    'skiplink': 'Ga direct naar inhoud',
    'view-faq': 'Bekijk de meestgestelde vragen',
    'logo-government': 'Logo Rijksoverheid, homepage',
    'identity_image_alt': 'Holder QR maken',
    'header-appstore': 'Downloaden in de App Store',
    'header-googleplaystore': 'Ontdek het op Google Play'
}

export default nl;
