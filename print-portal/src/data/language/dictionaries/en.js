import messageInfoTestResultAbout from '../templates/en/message-info-testResultAbout';
import messageInfoVaccinationAbout from '../templates/en/message-info-vaccinationAbout';
import footer from '../templates/en/footer';
import { pdfFooter, pdfInstructions } from '../templates/en/pdf';

const en = {
    'date': {
        'months': {
            'abbr': ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        }
    },
    'template': { footer },
    'views': {
        'home': {
            'pageHeader': 'Get access with a test declaration on paper',
            'pageIntro': '<p>A test declaration on paper is convenient if you don\'t have a smartphone. Here\'s how it works:</p><h4>Only access after testing</h4><p>Get tested when visiting certain social, cultural or sports events. Even when you\'ve already been vaccinated. Does your test prove you don\'t have coronavirus (negative test result)? Then you can get access.</p><h4>Your QR code in your pocket</h4><p>If your test proves you don\'t have coronavirus, you can make a personal QR code in this app. This will be your test declaration. The QR code is scanned before you get access.</p><h4>Minimum amount of data</h4><p>Your QR code only states when you tested negative (no coronavirus), the time of testing, and the minimum amount of identifying data: your first name initial, your last name initial, your day of birth, and your month of both. We verify this information to make sure the test result is yours.</p>',
            'userConsentText': 'I\'ve read the <a href="https://coronacheck.nl/en/privacy" target="_blank">privacy statement</a> and give consent for processing my personal data.'
        },
        'choiceProof': {
            'pageHeader': 'TODO',
            'pageIntro': '<p>TODO</p>',
            'choiceTestHeader': 'TODO',
            'choiceTestBody': 'TODO',
            'choiceVaccinationHeader': 'TODO',
            'choiceVaccinationBody': 'TODO'
        },
        'choiceTestLocation': {
            'pageHeader': 'TODO Waar ben je getest?',
            'pageIntro': '<p>TODO Is je testuitslag negatief? Dan kan je er een QR-code van maken. Geef aan bij welke testlocatie je bent getest.</p>',
            'choiceGGDHead': 'TODO GGD',
            'choiceGGDBody': 'TODO Login met DigiD',
            'choiceOtherLocation': 'TODO Andere testlocatie',
            'didNotGetTestedYet': 'TODO Ik ben nog niet getest'
        },
        'collectVaccination': {
            'pageHeader': 'TODO',
            'pageIntro': 'TODO',
            'loginDigid': 'TODO'
        },
        'yourVaccinations': {
            'pageHeader': 'TODO',
            'pageIntro': '<p>TODO</p>',
            'createTestProofButton': 'Make QR code',
            'somethingIsWrong': 'Klopt er iets niet?'
        },
        'provideCode': {
            'pageHeader': 'Retrieve test result',
            'pageIntro': 'Enter your retrieval code. The test location sent it to you. Or click on the link in the email you\'ll get from the test location.',
            'uniqueCode': 'Retrieval code',
            'verificationCode': 'Verification code',
            'verificationCodeDirection': 'You get a code via text or email',
            'sendAgain': 'Send again',
            'didNotGetCode': 'I don\'t have a code',
            'emptyTestCode': 'Retrieval code not entered',
            'invalidTestCode': 'Invalid retrieval code',
            'invalidVerificationCode': 'Invalid verification code',
            'emptyVerificationCode': 'Verification code not entered',
            'sendCode': 'Send code'
        },
        'yourTestResults': {
            'pageHeader': 'Check your test result',
            'pageIntro': '<p>This test result is retrieved from the test location.</p><p>Is the below correct? Then you can convert the negative test result into a QR code. This is your test declaration.</p>',
            'createTestProofButton': 'Make QR code',
            'somethingIsWrong': 'Is something wrong?',
            'retrievedTestResult': 'Retrieved test result',
            'noTestResultPresent': 'Test result not known',
            'noTestResultPresentDirection': 'Retrieve your test result first. Use the retrieval code given to you by the test location.'
        },
        'testResultPending': {
            'pageHeader': 'Test result not yet known',
            'pageIntro': 'Please try again later.<br>If you have any questions, contact your test location.'
        },
        'print': {
            'openPDF': 'Open PDF'
        },
        'printTestResult': {
            'pageHeader': 'Your test declaration',
            'pageIntro': 'You\'ve made a test declaration,  in the form of a QR code. Read which information the QR code contains. Print the PDF and take it with you.'
        },
        'printVaccination': {
            'pageHeader': 'TODO',
            'pageIntro': '<p>TODO</p>'
        }
    },
    'components': {
        'languagePicker': {
            'language': 'Language',
            'changeLanguage': 'Change language',
            'currentLanguage': 'Current language'
        },
        'NegativeTest': {
            'resultNegative': 'Negative test result',
            'dateOfTest': 'Test date',
            'yourCredentials': 'Identification details'
        },
        'faq': {
            'viewFaq': 'View frequently asked questions'
        },
        'preferMobile': {
            'header': 'Prefer having your test declaration on mobile?',
            'intro': 'Then download the app.'
        },
        'vaccination': {
            'vaccination': 'Vaccination',
            'name': 'Name',
            'dateOfBirth': 'Date of birth'
        }
    },
    'message': {
        'info': {
            'testResultAbout': {
                'head': 'About the test result',
                'body': messageInfoTestResultAbout
            },
            'testResultSomethingWrong': {
                'head': 'Are the data incorrect?',
                'body': messageInfoTestResultAbout
            },
            'vaccinationAbout': {
                'head': 'TODO',
                'body': messageInfoVaccinationAbout
            },
            'vaccinationSomethingWrong': {
                'head': 'TODO',
                'body': '<p>TODO</p>'
            },
            'noVerificationCode': {
                'head': 'Need a new verification code?',
                'body': '<p>The test location sends you a verification code via text or email. Didn\'t get one? Then you can request a new code.</p>'
            }
        },
        'error': {
            'expiredTestCode': {
                'head': 'Your QR code has expired',
                'body': '<p>The code you\'ve entered is invalid. Please check it. Need a new QR code? Get tested again.</p>'
            },
            'general': {
                'head': 'Sorry, something went wrong',
                'body': '<p>Because of a technical error. Contact the CoronaCheck helpdesk via <a href="tel:0800-1421" class="only-clickable-for-mobile">0800-1421</a>.</p>'
            }
        }
    },
    'pdf': {
        'yourTestProof': 'Your test declaration',
        'dayOfBirth': 'Day of birth',
        'footerText': pdfFooter,
        'initials': 'Initials',
        'instructions': 'Instructions',
        'instructionsText': pdfInstructions,
        'preferMobile': 'Prefer showing your test declaration on your mobile phone? Then use the retrieval code (the test location sends it in an email) in the CoronaCheck app.',
        'questions': 'Questions?',
        'testedAt': 'Tested for',
        'validUntil': 'Valid until'
    },
    'image': {
        'holder': {
            'overview': 'My overview',
            'showQrIntro': 'Show your QR code and your ID at the entrance of the location you are visiting.',
            'myQr': 'My QR code',
            'validText': 'Valid until<br> March 11th 14:06',
            'showQr': 'Show QR'
        }
    },
    'back': 'Back',
    'close': 'Close',
    'faq': 'Frequently asked questions',
    'forInstanceAbbr': 'E.g.',
    'goBackToStart': 'To Home',
    'next': 'Next',
    'orderWords': ['First', 'Second', 'Third'],
    'skiplink': 'Skip to content',
    'logo-government': 'Logo Dutch Government, homepage',
    'identity_image_alt': 'Make Holder QR code',
    'header-appstore': 'Download on the App Store',
    'header-googleplaystore': 'Get it on Google Play'
}

export default en;
