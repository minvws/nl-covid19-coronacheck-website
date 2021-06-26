import messageInfoVaccinationAbout from '../templates/en/message-info-vaccinationAbout';
import footer from '../templates/en/footer';
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
            'pageHeader': 'Get access with a certificate on paper',
            'pageIntro': '<h2 class="screen-reader-text">Here\'s how it works</h2><p>A certificate on paper is convenient if you don\'t have a smartphone. Here\'s how it works:</p><div class="home__section"><h4>Only access with a certificate</h4><p>Want access to certain locations and activities? Or are you travelling abroad? You can if you have been fully vaccinated or if you have a negative test result that confirms you don’t have corona.</p><p>Please note: not fully vaccinated? Then you can’t make a certificate.</p></div><div class="home__section"><h4>QR code = your proof</h4><p>You can make a QR code of your vaccination or a negative test result. This is your certificate. The QR code is scanned before you get access.</p></div><div class="home__section"><h4>QR codes for the Netherlands and international</h4><p>This app generates a QR code for the Netherlands and one for other countries. Travelling outside of the Netherlands? Then use your international QR code.</p></div>',
            'userConsentHeader': 'Start making a certificate on paper',
            'userConsentText': 'I have read the <a href="https://coronacheck.nl/en/privacy" target="_blank">privacy statement</a> and understand how CoronaCheck processes my data.',
            'noConsentError': 'Give consent to the privacy statement first'
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
            'pageIntro': '<p>Indicate whether you were tested at the GGD or at a different test location.</p>',
            'choiceGGDHead': 'GGD',
            'choiceGGDBody': 'Log in with DigiD',
            'loginDigid': 'I don’t have DigiD',
            'choiceOtherLocation': 'Other test location',
            'didNotGetTestedYet': 'I have not been tested yet'
        },
        'collectVaccination': {
            'pageHeader': 'Collect vaccination',
            'pageIntro': '<p>Have you been vaccinated? Log in with DigiD. Your vaccination details will be automatically retrieved.</p><p>Questions about vaccinations? Read more on the <a href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-vaccinatie" target="_blank">website of the Dutch Government</a></p>',
            'loginDigid': 'Log in with DigiD',
            'dontHaveDigid': 'I don’t have DigiD'
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
            'pageHeader': 'We can’t make a certificate',
            'pageIntro': '<p>At the moment, we cannot provide proof of your vaccination. This can have different causes. For more information, please go to <a href="https://www.coronacheck.nl/en/guidepost" target="_blank">CoronaCheck.nl/en/guidepost</a>.</p>'
        },
        'vaccinationsIncomplete': {
            'pageHeader': 'We can’t make a certificate',
            'pageIntro': '<p>At this moment, we can’t make a certificate. For a Dutch certificate you need to be fully vaccinated. An international certificate can be made from July 1st.</p>'
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
            'pageIntro': '<p>This test result is retrieved from the test location.</p><p>Is the below correct? Then you can convert the negative test result into a QR code. This is your test certificate.</p>',
            'createTestProofButton': 'Make QR code',
            'somethingIsWrong': 'Is something wrong?',
            'retrievedTestResult': 'Retrieved test result'
        },
        'testResultPending': {
            'pageHeader': 'Test result not yet known',
            'pageIntro': 'Please try again later.<br>If you have any questions, contact your test location.'
        },
        'testResultNone': {
            'pageHeader': 'No negative test result available',
            'pageIntro': 'There is no negative test result available.'
        },
        'print': {
            'openPDF': 'Open PDF'
        },
        'printTestResult': {
            'pageHeader': 'Your test certificate',
            'pageIntro': 'You\'ve made a test certificate,  in the form of a QR code. Read which information the QR code contains. Print the PDF and take it with you.'
        },
        'printVaccination': {
            'pageHeader': 'Print your vaccination certificate',
            'pageIntro': '<h3>Your certificate</h3><p>You’ve made a vaccination certificate in the form of a QR code. You have a QR code for the Netherlands and one for other countries.</p><h3>Information in the QR</h3><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Read what is in the QR codes</a>.</p><h3>What now?</h3><p>Print the PDF and take your print to the location or activity you’re visiting.Or to the country you’re travelling to.</p> '
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
                'body': '<p>Wrong name or date of birth? Or are your vaccination details incorrect? Please go to <a href="https://www.coronacheck.nl/en/guidepost" target="_blank">CoronaCheck.nl/en/guidepost</a> for more information.</p>'
            },
            'noVerificationCode': {
                'head': 'Need a new verification code?',
                'body': '<p>The test location sends you a verification code via text or email. Didn\'t get one? Then you can request a new code.</p>'
            },
            'didNotGetTestedYet': {
                'head': 'I haven’t been tested yet',
                'body': '<p>You must get tested before you make a QR code. You can only turn a negative test result into a QR code.</p><p>A test certificate is valid until 40 hours after the moment you’ve been tested. So schedule your test on time. And make sure your QR code is scanned at the entrance within 40 hours.</p><p><a href="https://coronacheck.nl/en/testafspraak-in-app" class="btn" target="_blank">Make an appointment\n</a></p>'
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
            },
            'digidCanceled': {
                'head': 'Login failed',
                'body': 'You can log in again to retrieve your %{type}',
                'vaccination': 'vaccinations',
                'negativetest': 'test result'
            },
            'digidFinished': {
                'body': 'We\'ll retrieve your vaccinations. You will be logged out of DigiD automatically'
            },
            'noInternet': {
                'head': 'You\'re not connected to the internet',
                'body': 'Check your connection and try again.'
            }
        },
        'error': {
            'expiredTestCode': {
                'head': 'Your QR code has expired',
                'body': '<p>The code you\'ve entered is invalid. Please check it again. Need a new QR code? Get tested again.</p>'
            },
            'general': {
                'head': 'Sorry, something went wrong',
                'body': '<p>Because of a technical error. Contact the CoronaCheck helpdesk.</p>'
            },
            'generalWithError': {
                'head': 'Sorry, there is an outage',
                'body': '<p>Contact our helpdesk and give them error code (%{code}) or try again later.</p>'
            },
            'serverBusy': {
                'head': '',
                'body': '<p>It\'s very busy at the moment. Try again later today.</p>'
            },
            'someServerBusyButResult': {
                'head': '',
                'body': '<p>Details possibly incomplete. Due to a technical issue at one of our involved parties, details might be missing. Please try again later./p>'
            },
            'someServerBusyNoResult': {
                'head': 'Sorry, it\'s very busy at the moment',
                'body': '<p>We can\'t retrieve your vaccinations now. Please try again later.</p>'
            },
            'someServerErrorButResult': {
                'head': '',
                'body': '<p>Something went wrong at one of our involved parties. Please try again if you\'re missing vaccinations.</p>'
            },
            'someServerErrorNoResult': {
                'head': '',
                'body': '<p>We can\'t retrieve your vaccinations now. Something went wrong at one of our involved parties. Please try again later.</p>'
            },
            'parseErrorInResult': {
                'head': '',
                'body': '<p>Something went wrong. The result could not be read. Please contact your event provider. (Code: x)</p>'
            },
            'noInternet': {
                'head': 'You\'re not connected to the internet',
                'body': 'Check your connection and try again.'
            },
            'signerFailed': {
                'head': 'Sorry, something went wrong',
                'body': '<p>Contact our helpdesk and give them error code (print sign error) or try again later.</p>'
            }
        }
    },
    'pdf': {
        'eu': {},
        'nl': {
            'instructions': '1. Print this certificate on A4 (black-and-white allowed)\n\n2. Bring a valid proof of identity to the activity you’re visiting \n\n3. Show the certificate and the proof of identity (and if needed a ticket) at the entrance',
            'propertiesLabel': 'Details',
            'title': 'Certificate for the Netherlands',
            'intro': 'Visiting locations or activities within the Netherlands? Then use this certificate.',
            'qrTitle': 'Coronavirus pass',
            'userData': {
                'initials': 'Initials',
                'dateOfBirth': 'Day of birth',
                'validFrom': 'Valid from',
                'validUntil': 'Valid until',
                'validUntilVaccination': 'This paper certificate is valid until %{date}. After this date, you can make a new coronavirus pass via coronacheck.nl',
                'privacyNote': 'You can keep your details to yourself'
            }
        },
        'instructions': 'Instructions',
        'questions': 'QUESTIONS?',
        'questionsContent': 'Please find frequently asked questions on www.coronacheck.nl. You can also send an email to helpdesk@coronacheck.nl or reach us (for free) on 0800-1421',
        'metadata': {
            'title': 'Certificate containing QR-code',
            'author': 'CoronaCheck'
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
    'of': 'of',
    'skiplink': 'Skip to content',
    'unknown': 'Unknown',
    'tooBusy': 'It\'s very busy right now, and therefore you cannot log in at the moment. Could you please try again later?'
}

export default en;
