import messageInfoVaccinationAbout from '../templates/en/message-info-vaccinationAbout';
import footer from '../templates/en/footer';
import { pdfFooter, pdfInstructions } from '../templates/en/pdf';
import { messageInfoTestResultAboutV2, messageInfoTestResultAboutV3 } from '../templates/en/message-info-testResultAbout';

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
            'userConsentText': 'I have read the <a href="https://coronacheck.nl/en/privacy" target="_blank">privacy statement</a> and understand how CoronaCheck processes my data.'
        },
        'choiceProof': {
            'pageHeader': 'What would you like to make a paper certificate of?',
            'pageIntro': '<p>You can make a QR code of a vaccination or negative test result.</p>',
            'choiceTestHeader': 'A negative test result',
            'choiceTestBody': 'The test proves I do not have coronavirus',
            'choiceVaccinationHeader': 'A vaccination',
            'choiceVaccinationBody': 'I have had my injection or injections'
        },
        'choiceTestLocation': {
            'pageHeader': 'Where have you been tested?',
            'pageIntro': '<p>Is your test result negative? Then you can turn it into a QR code. Please specify at which test location you were tested.</p>',
            'choiceGGDHead': 'GGD',
            'choiceGGDBody': 'Log in with DigiD',
            'loginDigid': 'I don’t have DigiD',
            'choiceOtherLocation': 'Other test location',
            'didNotGetTestedYet': 'I have not been tested yet'
        },
        'collectVaccination': {
            'pageHeader': 'Collect vaccination',
            'pageIntro': '<p>Have you been vaccinated? Log in with DigiD. Your vaccination details will be automatically retrieved.</p><p>Questions about vaccinations? Read more on the <a href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-vaccinatie" target="_blank">website of the Dutch Government</a></p>',
            'loginDigid': 'Log in with DigiD'
            // 'loginDigid': 'I don’t have DigiD'
        },
        'yourVaccinations': {
            'pageHeader': 'Your retrieved vaccinations',
            'pageIntro': '<p>You can make a QR code of your vaccination. This will be your certificate.</p>',
            'createTestProofButton': 'Make QR code',
            'somethingIsWrong': 'Is something wrong?'
        },
        'noVaccinations': {
            'pageHeader': 'No vaccination(s) available',
            'pageIntro': '<p>Details about your vaccination are not available.</p><p>Have you been vaccinated recently? It might take a little while before your details are available.</p><p>Your general practitioner might not be affiliated with the GGD. For more information, please go to <a href="https://www.coronacheck.nl/en/guidepost" target="_blank">CoronaCheck.nl/en/guidepost</a>.</p>'
        },
        'notPossibleVaccinations': {
            'pageHeader': 'We kunnen geen bewijs maken',
            'pageIntro': '<p>At the moment, we cannot provide proof of your vaccination. This can have different causes. For more information, please go to <a href="https://www.coronacheck.nl/en/guidepost" target="_blank">CoronaCheck.nl/en/guidepost</a>.</p>'
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
            'pageHeader': 'Print your vaccination certificate',
            'pageIntro': '<h3>Your certificate</h3><p>You’ve made a vaccination certificate in the form of a QR code. You have a QR code for The Netherlands and a QR code for when you travel within the European Union.</p><h3>Information in the QR</h3><p><a href="" target="_blank">Read what is in the QR codes</a>.</p><h3>What now?</h3><p>Print the PDF and take your print to the location or activity you’re visiting.Or to the country you’re travelling to.</p> '
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
            'yourCredentials': 'Identification details',
            'name': 'Name',
            'dateOfBirth': 'Date of birth'
        },
        'faq': {
            'viewFaq': 'View frequently asked questions'
        },
        'preferMobile': {
            'header': 'Prefer having your certificate on mobile?',
            'intro': 'Then download the app. You can also make a print of the certificate in the app.'
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
                'head': 'What has been retrieved?',
                'bodyV2': messageInfoTestResultAboutV2,
                'bodyV3': messageInfoTestResultAboutV3
            },
            'testResultSomethingWrong': {
                'head': 'Something is wrong',
                'body': '<p>Do your details not match your ID? Please contact your test location to have your details adjusted.</p>'
            },
            'vaccinationAbout': {
                'head': 'What has been retrieved?',
                'body': messageInfoVaccinationAbout
            },
            'vaccinationSomethingWrong': {
                'head': 'Something is wrong',
                'body': '<p>Wrong name or date of birth? Contact your doctor and let them know.</p><p>Missing an injection?<br>Contact the location you were vaccinated at.</p>'
            },
            'noVerificationCode': {
                'head': 'Need a new verification code?',
                'body': '<p>The test location sends you a verification code via text or email. Didn\'t get one? Then you can request a new code.</p>'
            },
            'areYouSureToCancelVaccination': {
                'head': 'Are you sure you want to stop?',
                'body': 'Then you need to log in again later using DigiD to retrieve your vaccination.',
                'yes': 'Yes, stop',
                'no': 'No, continue'
            },
            'areYouSureToCancelNegativeTest': {
                'head': 'Are you sure you want to stop?',
                'body': 'You must use your code to get your test result again later.',
                'yes': 'Yes, stop',
                'no': 'No, continue'
            }
        },
        'error': {
            'expiredTestCode': {
                'head': 'Your QR code has expired',
                'body': '<p>The code you\'ve entered is invalid. Please check it again. Need a new QR code? Get tested again.</p>'
            },
            'general': {
                'head': 'Sorry, something went wrong',
                'body': '<p>Because of a technical error. Contact the CoronaCheck helpdesk via <a href="tel:0800-1421">0800-1421</a>.</p>'
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
    'header-appstore': 'Download on the App Store',
    'header-googleplaystore': 'Get it on Google Play',
    'identity_image_alt': 'Make Holder QR code',
    'logo-government': 'Logo Dutch Government, homepage',
    'next': 'Next',
    'orderWords': ['First', 'Second', 'Third'],
    'skiplink': 'Skip to content',
    'testTypes': {
        'pcr': 'PCR-test'
    }
}

export default en;
