import messageInfoTestResultAbout from './../templates/en/message-info-testResultAbout';
import footer from './../templates/en/footer';

const en = {
    'date': {
        'months': {
            'abbr': ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        }
    },
    'template': { footer },
    'message': {
        'info': {
            'testResultAbout': {
                'head': '',
                'body': messageInfoTestResultAbout
            },
            'testResultSomethingWrong': {
                'head': '',
                'body': messageInfoTestResultAbout
            }
        },
        'error': {}
    },
    'pdf': {
        'dayOfBirth': 'Day of birth',
        'footerText': `View the frequently asked questions at www.CoronaCheck.nl
Send an e-mail to helpdesk@coronacheck.nl or call at 0800-1421 (free)`,
        'initials': 'Initials',
        'instructions': 'Instructions',
        'instructionsText': `1. Make a print of this test declaration on A4 size paper without adjusting the scale (in black-white is fine)

2. Bring a valid proof of identity to the activity

3. Display your test declaration and proof of identity (and if necessary your entrance ticket) at the entrance

Beware: this is not an entrance ticket for the activity you're visiting`,
        'preferMobile': 'Prefer showing your test declaration on your mobile phone? Then use the retrieval code (the test location sends it in an email) in the CoronaCheck app.',
        'questions': 'Questions?',
        'testedAt': 'Tested for',
        'yourTestProof': 'Your test declaration',
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
    'changeLanguage': 'Change language',
    'close': 'Close',
    'createTestProof': 'Make QR code',
    'currentLanguage': 'Current language',
    'dateOfTest': 'Test date',
    'didNotGetCode': 'I don\'t have a code',
    'emptyTestCode': 'Retrieval code not entered',
    'enterCode': 'Retrieve test result',
    'expiredTestCodeHead': 'Your QR code has expired',
    'expiredTestCodeBody': '<p>The code you\'ve entered is invalid. Please check it. Need a new QR code? Get tested again.</p>',
    'faq': 'Frequently asked questions',
    'forInstanceAbbr': 'E.g.',
    'generalError': 'Sorry, something went wrong',
    'generalErrorBody': '<p>Because of a technical error. Contact the CoronaCheck helpdesk via <a href="tel:0800-1421" class="only-clickable-for-mobile">0800-1421</a>.</p>',
    'goBackToStart': 'To Home',
    'invalidTestCode': 'Invalid retrieval code',
    'invalidVerificationCode': 'Invalid verification code',
    'language': 'Language',
    'next': 'Next',
    'noTestProofPresent': 'There\'s no test result',
    'noTestProofPresentDirection': 'You can only turn a negative test result into a test declaration. Retrieve your test result first.',
    'noTestResultPresent': 'Test result not known',
    'noTestResultPresentDirection': 'Retrieve your test result first. Use the retrieval code given to you by the test location.',
    'noVerificationCodeHead': 'Need a new verification code?',
    'noVerificationCodeMessage': '<p>The test location sends you a verification code via text or email. Didn\'t get one? Then you can request a new code.</p>',
    'preferMobile': 'Prefer having your test declaration on mobile?',
    'preferMobileDirection': 'Then download the app.',
    'printPortalHomeBodyText': '<p>A test declaration on paper is convenient if you don\'t have a smartphone. Here\'s how it works:</p><h3>Only access after testing</h3><p>Get tested when visiting certain venues or activities. Even when you\'ve already been vaccinated. Does your test prove you don\'t have coronavirus (negative test result)? Then you can get access.</p><h3>Your QR code in your pocket</h3><p>If your test proves you don\'t have coronavirus, you can make a personal QR code in this app. This will be your test declaration. The QR code is scanned before you get access.</p><h3>Minimum amount of data</h3><p>Your QR code only states when you tested negative (no coronavirus), the time of testing, and the minimum amount of identifying data: your first name initial, your last name initial, your day of birth, and your month of both. We verify this information to make sure the test result is yours.</p>',
    'printPortalHomeHeader': 'Get access with a test declaration on paper',
    'retrieveTestResult': 'Retrieve test result',
    'sendCode': 'Send code',
    'sendAgain': 'Send again',
    'testCodeDirection': 'Enter your retrieval code. The test location sent it to you. Or click on the link in the email you\'ll get from the test location.',
    'uniqueCode': 'Retrieval code',
    'retrievedTestResult': 'Retrieved test result',
    'resultNegative': 'Negative test result',
    'resultPending': 'Test result not yet known',
    'resultPendingDirection': 'Please try again later.<br>If you have any questions, contact your test location.',
    'somethingIsWrong': 'Is something wrong?',
    'openPDF': 'Open PDF',
    'userConsentText': 'I\'ve read the <a href="https://coronacheck.nl/en/privacy" target="_blank" rel="noopener noreferrer">privacy statement</a> and understand how CoronaCheck processes my data.',
    'verificationCode': 'Verification code',
    'verificationCodeDirection': 'You get a code via text or email',
    'yourCredentials': 'Identification details',
    'yourNegativeTestresult': 'Check your test result',
    'yourNegativeTestresultDirection': '<p>This test result is retrieved from the test location.</p><p>Is the below correct? Then you can convert the negative test result into a QR code. This is your test declaration.</p>',
    'yourTestProof': 'Your test declaration',
    'yourTestProofDirection': 'You\'ve made a test declaration,  in the form of a QR code. Read which information the QR code contains. Print the PDF and take it with you.',
    'skiplink': 'Skip to content',
    'view-faq': 'View frequently asked questions',
    'logo-government': 'Logo Dutch Government, homepage',
    'identity_image_alt': 'Make Holder QR code',
    'header-appstore': 'Download on the App Store',
    'header-googleplaystore': 'Get it on Google Play'
}

export default en;
