import { messageInfoTestResultAboutV2, messageInfoTestResultAboutV3 } from '../templates/nl/message-info-testResultAbout';
import messageInfoVaccinationAbout from '../templates/nl/message-info-vaccinationAbout';
import footer from '../templates/nl/footer';
import { pdfFooter, pdfInstructions } from '../templates/nl/pdf';

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
            'pageIntro': '<p>Een testbewijs op papier is handig als je geen smartphone hebt. Dit is hoe het werkt:</p><h4>Alleen toegang na testen</h4><p>Laat je daarom testen als je bepaalde sociale, culturele of sportieve activiteiten bezoekt. Ook als je al gevaccineerd bent. Blijkt uit de test dat je geen corona hebt (negatieve testuitslag)? Dan krijg je toegang.</p><h4>Jouw QR-code op zak</h4><p>Als uit de test blijkt dat je geen corona hebt kun je in de app of op papier een persoonlijke QR-code maken. Dat is jouw testbewijs. De QR-code wordt gescand voordat je toegang krijgt. Zorg dat jouw QR-code binnen 40 uur na het moment van testen gescand is bij de ingang.</p><h4>Zo min mogelijk gegevens</h4><p>In jouw QR-code staan alleen je negatieve testuitslag (geen corona), het tijdstip van de test en minimale gegevens: de eerste letter van je voornaam, de eerste letter van je achternaam, je geboortedag en geboortemaand. Dit is ter controle, om zeker te zijn dat de testuitslag bij jou hoort.</p>',
            'userConsentText': 'Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank">privacyverklaring</a> gelezen en geef toestemming voor het verwerken van mijn persoonsgegevens.'
        },
        'choiceProof': {
            'pageHeader': 'Waar wil je een papieren bewijs van maken?',
            'pageIntro': '<p>Je kan een QR-code maken van een negatieve testuitslag of van een vaccinatie. In Europa kan geldigheid verschillen.</p>',
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
            'loginDigid': 'Login met DigiD'
            // 'loginDigid': 'Ik heb geen DigiD'
        },
        'yourVaccinations': {
            'pageHeader': 'Jouw opgehaalde vaccinaties',
            'pageIntro': '<p>Je kan een bewijs maken van je vaccinaties.</p>',
            'createTestProofButton': 'Maak QR-code',
            'somethingIsWrong': 'Klopt er iets niet?'
        },
        'noVaccinations': {
            'pageHeader': 'Geen vaccinatie(s) beschikbaar',
            'pageIntro': '<p>Er zijn geen gegevens over je vaccinatie beschikbaar.</p><p>Ben je kortgeleden gevaccineerd? Dan kan het even duren voordat je gegevens beschikbaar zijn.<p>Het kan zijn dat jouw huisarts niet is aangesloten op de GGD. Kijk voor meer informatie op CoronaCheck.nl/wegwijzer.</p>'
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
            'retrievedTestResult': 'Opgehaalde testuitslag',
            'noTestResultPresent': 'Er is geen testuitslag bekend',
            'noTestResultPresentDirection': 'Haal eerst je testuitslag op. Gebruik hiervoor de code die je van de testlocatie hebt gekregen. '
        },
        'testResultPending': {
            'pageHeader': 'Testuitslag nog niet bekend',
            'pageIntro': 'Probeer het later nog eens.<br>Neem voor vragen contact op met jouw testlocatie.'
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
            'pageIntro': '<p>Je hebt een vaccinatiebewijs gemaakt, in de vorm van een QR-code. Je hebt een vaccinatiebewijs voor binnen Nederland, en een vaccinatiebewijs voor in Europa.<br><a href="" target="_blank">Lees hier</a> wat er zoal in staat. Print de PDF en neem het printje mee.</p>'
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
                'body': '<p>Klopt je naam of geboortedatum niet? Neem contact op met je huisarts en geef dit door.</p><p>Mist er een prik?<br>Neem contact op met de locatie waar je bent gevaccineerd.</p>'
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
            }
        },
        'error': {
            'expiredTestCode': {
                'head': 'De ophaalcode is verlopen',
                'body': '<p>De code die je invult is niet meer geldig. Controleer of je de juiste code hebt ingevuld. Nieuwe code nodig? Laat je dan opnieuw testen.</p>'
            },
            'general': {
                'head': 'Sorry, er gaat iets mis',
                'body': '<p>Dat komt door een technische fout. Neem contact op met de helpdesk van CoronaCheck via <a href="tel:0800-1421" class="only-clickable-for-mobile">0800-1421</a>.</p>'
            }
        }
    },
    'pdf': {
        'yourTestProof': 'Jouw testbewijs',
        'dayOfBirth': 'Geboortedag',
        'footerText': pdfFooter,
        'initials': 'Initialen',
        'instructions': 'INSTRUCTIES',
        'instructionsText': pdfInstructions,
        'preferMobile': 'Laat je jouw testbewijs liever op je telefoon zien? Gebruik dan de code uit de e-mail in de CoronaCheck-app',
        'questions': 'VRAGEN?',
        'testedAt': 'Getest op',
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
