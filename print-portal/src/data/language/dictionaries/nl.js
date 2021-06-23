import { messageInfoTestResultAboutV2, messageInfoTestResultAboutV3 } from '../templates/nl/message-info-testResultAbout';
import messageInfoVaccinationAbout from '../templates/nl/message-info-vaccinationAbout';
import footer from '../templates/nl/footer';

// note: some texts use \n for a break. This is the standard.
// other texts have <br> This is when the text needs to be rendered in a html-like style, because it has bold or
// colored texts. See tools/print/text-helpers.js

const nl = {
    'date': {
        'months': {
            'abbr': ['JAN', 'FEB', 'MAA', 'APR', 'MEI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC']
        }
    },
    'template': { footer },
    'views': {
        'home': {
            'pageHeader': 'Krijg toegang met een papieren bewijs',
            'pageIntro': '<h2 class="screen-reader-text">Zo werkt het</h2><p>Een bewijs op papier is handig als je geen smartphone hebt. Dit is hoe het werkt:</p><div class="home__section"><h4>Alleen toegang met een bewijs</h4><p>Wil je toegang krijgen tot bepaalde locaties of activiteiten? Of ga je op reis? Dat kan als je gevaccineerd bent. Of als uit een test blijkt dat je geen corona hebt. </p></div><div class="home__section"><h4>QR-code = jouw bewijs</h4><p>Je kunt een persoonlijke QR-code maken van een vaccinatie of een negatieve testuitslag. Dat is jouw bewijs. De QR-code wordt gecheckt voordat je toegang krijgt.</p></div><div class="home__section"><h4>QR-codes voor Nederland en internationaal</h4><p>De app maakt twee QR-codes: één voor Nederland en één voor internationaal. Reis je buiten Nederland? Gebruik dan je internationale QR-code.</p></div>',
            'userConsentHeader': 'Maak een papieren bewijs',
            'userConsentText': 'Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank">privacyverklaring</a> gelezen en begrijp hoe CoronaCheck mijn gegevens gebruikt',
            'noConsentError': 'Ga eerst akkoord met de privacyverklaring'
        },
        'choiceProof': {
            'pageHeader': 'Waar wil je een papieren bewijs van maken?',
            'pageIntro': '<p>Je kunt een QR-code maken van een negatieve testuitslag of van een vaccinatie. </p>',
            'choiceTestHeader': 'Een negatieve testuitslag',
            'choiceTestBody': 'Uit de test blijkt dat ik geen corona heb',
            'choiceVaccinationHeader': 'Een vaccinatie',
            'choiceVaccinationBody': 'Ik heb mijn prik of prikken gehad'
        },
        'choiceTestLocation': {
            'pageHeader': 'Waar ben je getest?',
            'pageIntro': '<p>Geef aan of je bij de GGD of bij een andere testlocatie getest bent.</p>',
            'choiceGGDHead': 'GGD',
            'choiceGGDBody': 'Login met DigiD',
            'loginDigid': 'Ik heb geen DigiD',
            'choiceOtherLocation': 'Andere testlocatie',
            'didNotGetTestedYet': 'Ik ben nog niet getest'
        },
        'collectVaccination': {
            'pageHeader': 'Vaccinatie ophalen',
            'pageIntro': '<p>Ben je al gevaccineerd? Log in met DigiD. De gegevens van je vaccinatie worden dan automatisch opgehaald.</p><p>Nog geen prik gehad? Laat je dan eerst vaccineren.</p>',
            'loginDigid': 'Login met DigiD',
            'dontHaveDigid': 'Ik heb geen DigiD'
        },
        'yourVaccinations': {
            'pageHeader': 'Jouw opgehaalde vaccinaties',
            'pageIntro': '<p>Je kan een bewijs maken van je vaccinaties.</p>',
            'createTestProofButton': 'Maak QR-code',
            'somethingIsWrong': 'Klopt er iets niet?'
        },
        'noVaccinations': {
            'pageHeader': 'Geen vaccinatie(s) beschikbaar',
            'pageIntro': '<p>Er zijn geen gegevens over je vaccinatie beschikbaar.</p><p>Ben je kortgeleden gevaccineerd? Dan kan het even duren voordat je gegevens beschikbaar zijn.<p>Het kan zijn dat jouw huisarts niet is aangesloten op de GGD. Kijk voor meer informatie op <a href="https://coronacheck.nl/wegwijzer" target="_blank">CoronaCheck.nl/wegwijzer.</a></p>'
        },
        'notPossibleVaccinations': {
            'pageHeader': 'We kunnen geen bewijs maken',
            'pageIntro': '<p>Op dit moment kunnen we geen bewijs maken van jouw vaccinatie. Dit kan verschillende oorzaken hebben. <a href="https://coronacheck.nl/wegwijzer" target="_blank">Lees hier meer</a>.</p>'
        },
        'provideCode': {
            'pageHeader': 'Testuitslag ophalen',
            'pageIntro': 'Vul jouw ophaalcode in. Deze heb je van de testlocatie gekregen. Of klik op de link in de e-mail die je van je testlocatie krijgt.',
            'uniqueCode': 'Ophaalcode',
            'verificationCode': 'Verificatiecode',
            'verificationCodeDirection': 'Je krijgt een code in een sms of e-mail',
            'sendAgain': 'Verstuur opnieuw',
            'didNotGetCode': 'Ik heb geen code gekregen',
            'emptyTestCode': 'Ophaalcode niet ingevuld',
            'invalidTestCode': 'Geen geldige ophaalcode',
            'invalidVerificationCode': 'Geen geldige verificatiecode',
            'emptyVerificationCode': 'Verificatiecode niet ingevuld',
            'sendCode': 'Stuur code'
        },
        'yourTestResults': {
            'pageHeader': 'Controleer je testuitslag',
            'pageIntro': '<p>Deze testuitslag is opgehaald bij de testlocatie.</p><p>Kloppen de gegevens hieronder? Dan kun je van de negatieve testuitslag een QR-code maken. Dat is jouw bewijs.</p>',
            'createTestProofButton': 'Maak QR-code',
            'somethingIsWrong': 'Klopt er iets niet?',
            'retrievedTestResult': 'Opgehaalde testuitslag'
        },
        'testResultPending': {
            'pageHeader': 'Testuitslag nog niet bekend',
            'pageIntro': 'Probeer het later nog eens.<br>Neem voor vragen contact op met jouw testlocatie.'
        },
        'testResultNone': {
            'pageHeader': 'Geen negatieve testuitslag',
            'pageIntro': 'Er is geen negatieve testuitslag beschikbaar.'
        },
        'print': {
            'openPDF': 'Open PDF'
        },
        'printTestResult': {
            'pageHeader': 'Print jouw Nederlandse testbewijs',
            'pageIntro': '<p><b>Jouw bewijs</b><br>Je hebt een Nederlands testbewijs gemaakt, in de vorm van een QR-code. Deze is geldig binnen Nederland, maar niet in andere landen. Als de Europese regelgeving ingaat (vanaf 1 juli) kun je ook een internationale QR-code maken.</p><p><b>Informatie in de QR</b><br><a href="https://web.acc.coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><p><b>En nu?</b><br>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
        },
        'printVaccination': {
            'pageHeader': 'Print jouw Nederlandse vaccinatiebewijs',
            'pageIntro': '<p><b>Jouw bewijs</b><br>Je hebt een Nederlands vaccinatiebewijs gemaakt, in de vorm van een QR-code. Deze is geldig binnen Nederland, maar niet in andere landen. Als de Europese regelgeving ingaat (vanaf 1 juli) kun je ook een internationale QR-code maken.</p><p><b>Informatie in de QR</b><br><a href="https://web.acc.coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><p><b>En nu?</b><br>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
        }
    },
    'components': {
        'languagePicker': {
            'language': 'Taal',
            'changeLanguage': 'Wissel van taal',
            'currentLanguage': 'Huidige taal'
        },
        'NegativeTest': {
            'resultNegative': 'Negatieve testuitslag',
            'dateOfTest': 'Testdatum',
            'yourCredentials': 'Jouw gegevens',
            'name': 'Naam',
            'dateOfBirth': 'Geboortedatum'
        },
        'faq': {
            'viewFaq': 'Bekijk de meestgestelde vragen'
        },
        'preferMobile': {
            'header': 'Liever je bewijs op je mobiel?',
            'intro': 'Download dan de app. Ook van een bewijs in de app kun je een print maken.'
        },
        'vaccination': {
            'vaccination': 'Vaccinatie',
            'name': 'Naam',
            'dateOfBirth': 'Geboortedatum'
        }
    },
    'message': {
        'info': {
            'testResultAbout': {
                'head': 'Wat is er opgehaald?',
                'bodyV2': messageInfoTestResultAboutV2,
                'bodyV3': messageInfoTestResultAboutV3
            },
            'testResultSomethingWrong': {
                'head': 'Kloppen de gegevens niet?',
                'body': '<p>Zijn deze gegevens anders dan op je identiteitsbewijs? Neem contact op met je testlocatie. Zij kunnen je gegevens laten aanpassen.</p>'
            },
            'vaccinationAbout': {
                'head': 'Wat is er opgehaald?',
                'body': messageInfoVaccinationAbout
            },
            'vaccinationSomethingWrong': {
                'head': 'Er klopt iets niet',
                'body': '<p>Kloppen je gegevens niet? Of mist er een vaccinatie? Kijk op <a href="https://coronacheck.nl/wegwijzer" target="_blank">CoronaCheck.nl/wegwijzer</a>.</p><p>Mist er een prik? Neem contact op met de locatie waar je bent gevaccineerd.</p>'
            },
            'noVerificationCode': {
                'head': 'Nieuwe verificatiecode nodig?',
                'body': '<p>Je krijgt de verificatiecode via een sms of e-mail van de testlocatie. Niet gekregen? Dan kunnen we een nieuwe code sturen.</p>'
            },
            'didNotGetTestedYet': {
                'head': 'Ik ben nog niet getest',
                'body': '<p>Je moet je eerst laten testen voordat je een QR-code kan maken. Als uit de test blijkt dat je geen corona hebt kan je jouw QR-code maken.</p><p>Een testbewijs is geldig tot 40 uur na het moment van testen. Plan je test dus op tijd. En zorg dat jouw QR-code binnen 40 uur gescand is bij de ingang.</p><p><a href="https://coronacheck.nl/nl/testafspraak-in-app" class="btn" target="_blank">Maak een afspraak</a></p>'
            },
            'areYouSureToCancelVaccination': {
                'head': 'Weet je zeker dat je wilt stoppen?',
                'body': 'Je moet dan later opnieuw met DigiD inloggen om je vaccinatie op te halen.',
                'yes': 'Ja, stop',
                'no': 'Nee, ga door'
            },
            'areYouSureToCancelNegativeTest': {
                'head': 'Weet je zeker dat je wilt stoppen?',
                'body': 'Je kan later opnieuw een QR-code maken',
                'yes': 'Ja, stop',
                'no': 'Nee, ga door'
            },
            'digidCanceled': {
                'head': 'Inloggen is niet gelukt',
                'body': 'Je kunt opnieuw inloggen om je %{type} op te halen.',
                'vaccination': 'vaccinaties',
                'negativetest': 'testuitslag'
            },
            'digidFinished': {
                'body': 'We halen nu jouw vaccinaties op. Je wordt automatisch uitgelogd bij DigiD'
            },
            'sessionEnded': {
                'head': 'Je sessie is gestopt',
                'body': 'Voor de veiligheid stopt je sessie automatisch na 24 uur.'
            }
        },
        'error': {
            'expiredTestCode': {
                'head': 'De ophaalcode is verlopen',
                'body': '<p>De code die je invult is niet meer geldig. Controleer of je de juiste code hebt ingevuld. Nieuwe code nodig? Laat je dan opnieuw testen.</p>'
            },
            'general': {
                'head': 'Sorry, er gaat iets mis',
                'body': '<p>Dat komt door een technische fout. Neem contact op met de helpdesk van CoronaCheck via <a href="tel:0800-1421">0800-1421</a>.</p>'
            },
            'serverBusy': {
                'head': 'Sorry, er gaat iets mis',
                'body': '<p>Het is erg druk, probeer het later op de dag nog eens</p>'
            },
            'someServerBusyButResult': {
                'head': 'Sorry, er gaat iets mis',
                'body': '<p>Gegevens mogelijk niet compleet. Door drukte of een storing bij een van de partijen kunnen er gegevens ontbreken. Probeer het eventueel later nog een keer.</p>'
            },
            'someServerBusyNoResult': {
                'head': 'Sorry, het is erg druk',
                'body': '<p>Je vaccinaties konden niet worden opgehaald omdat het te druk is. Probeer het op een later oment nog eens.</p>'
            },
            'someServerErrorButResult': {
                'head': '',
                'body': '<p>Mogelijk zijn niet alle vaccinaties opgehaald omdat er iets fout ging bij bepaalde providers. Indien je vaccinaties mist, probeer het dan nog eens.</p>'
            },
            'someServerErrorNoResult': {
                'head': '',
                'body': '<p>Je vaccinaties konden niet worden opgehaald omdat er iets fout ging bij bepaalde providers. Probeer het nog eens</p>'
            },
            'parseErrorInResult': {
                'head': '',
                'body': '<p>Er ging iets mis, resultaat kon niet worden gelezen. Neem contact op met je event provider. (Code: x)</p>'
            },
            'noInternet': {
                'head': 'Je hebt geen internet',
                'body': 'Controleer je verbinding en probeer het opnieuw.'
            }
        }
    },
    'pdf': {
        'eu': {
            'negativeTest': {
                'instructions': '1. Print dit bewijs op A4 (mag in zwart-wit)\n\n2. Neem een geldig identiteitsbewijs mee op reis\n\n3. Laat de QR-code en je testgegevens zien aan de buitenlandse grens of als er in andere landen om gevraagd wordt.',
                'propertiesLabel': 'Gegevens negatieve test'
            },
            'vaccination': {
                'instructions': '1. Print dit bewijs op A4 (mag in zwart-wit)\n\n2. Neem een geldig identiteitsbewijs mee op reis\n\n3. Laat de QR-code en je testgegevens zien aan de buitenlandse grens of als er in andere landen om gevraagd wordt.',
                'propertiesLabel': 'Vaccinatiegegevens'
            },
            'title': 'Internationaal bewijs',
            'intro': 'Reis je buiten Nederland? Gebruik dan dit EU Digitaal Corona Certificaat.<br><br>Bekijk voor vertrek welke test- of vaccinatie- bewijzen geldig zijn in het land dat je bezoekt:<br><a>www.reopen.europa.eu/en</a>',
            'qrTitle': 'QR-code internationaal'
        },
        'nl': {
            'instructions': '1. Print dit bewijs op A4 (mag in zwart-wit)\n\n2. Neem een geldig identiteitsbewijs mee naar de activiteit\n\n3. Laat de QR-code (en eventueel ook je toegangskaartje) zien bij de ingang',
            'propertiesLabel': 'Gegevens',
            'title': 'Bewijs voor in Nederland',
            'intro': 'Bezoek je locaties of activiteiten binnen Nederland? Gebruik dan dit coronatoegangsbewijs.',
            'qrTitle': 'QR-code Nederland',
            'userData': {
                'initials': 'Initialen',
                'dateOfBirth': 'Geboortedag',
                'validFrom': 'Geldig vanaf',
                'validUntil': 'Geldig tot',
                'privacyNote': 'Dit hoef je niet te laten zien aan de scanner'
            }
        },
        'instructions': 'Instructies',
        'questions': 'VRAGEN?',
        'questionsContent': 'Bekijk de meestgestelde vragen op www.coronacheck.nl of stuur een e-mail naar <b>helpdesk@coronacheck.nl</b> of bel naar <b>0800-1421</b> (gratis)'
    },
    'back': 'Terug',
    'close': 'Sluiten',
    'faq': 'Meestgestelde vragen',
    'forInstanceAbbr': 'Bijv.',
    'goBackToStart': 'Naar home',
    'header-appstore': 'Downloaden in de App Store',
    'header-googleplaystore': 'Ontdek het op Google Play',
    'identity_image_alt': 'Holder QR maken',
    'logo-government': 'Logo Rijksoverheid, homepage',
    'next': 'Volgende',
    'skiplink': 'Ga direct naar inhoud',
    'unknown': 'Onbekend'
}

export default nl;
