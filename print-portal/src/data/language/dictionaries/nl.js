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
            'pageIntro': '<p>Een testbewijs op papier is handig als je geen smartphone hebt. Dit is hoe het werkt:</p><div class="home__section"><h4>Alleen toegang na testen</h4><p>Laat je daarom testen als je bepaalde sociale, culturele of sportieve activiteiten bezoekt. Ook als je al gevaccineerd bent. Blijkt uit de test dat je geen corona hebt (negatieve testuitslag)? Dan krijg je toegang.</p></div><div class="home__section"><h4>Jouw QR-code op zak</h4><p>Als uit de test blijkt dat je geen corona hebt kun je in de app of op papier een persoonlijke QR-code maken. Dat is jouw testbewijs. De QR-code wordt gescand voordat je toegang krijgt. Zorg dat jouw QR-code binnen 40 uur na het moment van testen gescand is bij de ingang.</p></div><div class="home__section"><h4>Zo min mogelijk gegevens</h4><p>In jouw QR-code staan alleen je negatieve testuitslag (geen corona), het tijdstip van de test en minimale gegevens: de eerste letter van je voornaam, de eerste letter van je achternaam, je geboortedag en geboortemaand. Dit is ter controle, om zeker te zijn dat de testuitslag bij jou hoort.</p></div>',
            'userConsentText': 'Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank">privacyverklaring</a> gelezen en begrijp hoe CoronaCheck mijn gegevens gebruikt',
            'noConsentError': 'Ga eerst akkoord met de privacyverklaring'
        },
        'choiceProof': {
            'pageHeader': 'Waar wil je een papieren bewijs van maken?',
            'pageIntro': '<p>Je kunt een QR-maken van een vaccinatie of van een negatieve testuitslag.</p>',
            'choiceTestHeader': 'Een negatieve testuitslag',
            'choiceTestBody': 'Uit de test blijkt dat ik geen corona heb',
            'choiceVaccinationHeader': 'Een vaccinatie',
            'choiceVaccinationBody': 'Ik heb mijn prik of prikken gehad'
        },
        'choiceTestLocation': {
            'pageHeader': 'Waar ben je getest?',
            'pageIntro': '<p>Is je testuitslag negatief? Dan kan je er een QR-code van maken. Geef aan bij welke testlocatie je bent getest.</p>',
            'choiceGGDHead': 'GGD',
            'choiceGGDBody': 'Login met DigiD',
            'loginDigid': 'Ik heb geen DigiD',
            'choiceOtherLocation': 'Andere testlocatie',
            'didNotGetTestedYet': 'Ik ben nog niet getest'
        },
        'collectVaccination': {
            'pageHeader': 'Vaccinatie ophalen',
            'pageIntro': '<p>Heb je een of meer prikken gekregen? Dan kan je een  bewijs maken.</p><p>Vragen over vaccinaties? Lees meer op de <a href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-vaccinatie" target="_blank">website van de Rijksoverheid</a></p>',
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
            'pageHeader': 'Je testbewijs',
            'pageIntro': 'Je hebt een testbewijs gemaakt, in de vorm van een QR-code. Lees hier wat er in staat. Open of download de PDF, print het uit en neem ’m mee.'
        },
        'printVaccination': {
            'pageHeader': 'Print jouw vaccinatiebewijs',
            'pageIntro': '<h3>Jouw bewijs</h3><p>Je hebt een vaccinatiebewijs gemaakt, in de vorm van een QR-code. Je hebt nu twee QR-codes: één voor Nederland en één internationale.</p><h3>Informatie in de QR</h3><p><a href="https://coronacheck.nl/nl/faq/18-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier kun je lezen wat er in de QR-codes staat</a>.</p><h3>En nu?</h3><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
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
                'body': '<p>Kloppen jouw gegevens niet met je identiteitsbewijs? Neem contact op met je testlocatie om je  gegevens te laten aanpassen.</p>'
            },
            'vaccinationAbout': {
                'head': 'Wat is er opgehaald?',
                'body': messageInfoVaccinationAbout
            },
            'vaccinationSomethingWrong': {
                'head': 'Er klopt iets niet',
                'body': '<p>Kloppen je naam en/of geboortedatum niet? Of staat er onjuiste informatie over je vaccinatie? Kijk op <a href="https://coronacheck.nl/wegwijzer">CoronaCheck.nl/wegwijzer</a> voor meer informatie.</p>'
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
                'head': 'TODO digidCanceled head',
                'body': 'TODO digidCanceled body'
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
                'instructions': '1. Print dit bewijs op A4 (mag in zwart-wit)\n\n2. Neem een geldig identiteitsbewijs mee op reis\n\n3. Laat de QR-code en je testgegevens zien aan de buitenlandse grens of als er in andere landen om gevraagd wordt.\n\nLet op: dit papieren bewijs is 28 dagen geldig. Daarna moet je een nieuw papieren bewijs maken.',
                'propertiesLabel': 'Vaccinatiegegevens'
            },
            'title': 'Internationaal bewijs',
            'intro': 'Reis je buiten Nederland? Gebruik dan dit EU Digitaal Corona Certificaat.<br><br>Bekijk voor vertrek welke test- of vaccinatie- bewijzen geldig zijn in het land dat je bezoekt:<br><a>www.reopen.europa.eu/en</a>',
            'qrTitle': 'QR-code internationaal'
        },
        'nl': {
            'instructions': '1. Print dit bewijs op A4 (mag in zwart-wit)\n\n2. Neem een geldig identiteitsbewijs mee naar de activiteit\n\n3. Laat de QR-code (en eventueel ook je toegangskaartje) zien bij de ingang\n\nLet op: dit papieren bewijs is 28 dagen geldig. Daarna kan je een nieuw papieren bewijs maken van je vaccinatie.',
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
        'questionsContent': 'Bekijk de meestgestelde vragen op CoronaCheck.nl of stuur een e-mail naar <b>helpdesk@coronacheck.nl</b> of bel naar <b>0800-1421</b> (gratis)'
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
    'close': 'Sluiten',
    'faq': 'Meestgestelde vragen',
    'forInstanceAbbr': 'Bijv.',
    'goBackToStart': 'Naar home',
    'header-appstore': 'Downloaden in de App Store',
    'header-googleplaystore': 'Ontdek het op Google Play',
    'identity_image_alt': 'Holder QR maken',
    'logo-government': 'Logo Rijksoverheid, homepage',
    'next': 'Volgende',
    'orderWords': ['Eerste', 'Tweede', 'Derde'],
    'skiplink': 'Ga direct naar inhoud',
    'testTypes': {
        'pcr': 'PCR-test'
    }
}

export default nl;
