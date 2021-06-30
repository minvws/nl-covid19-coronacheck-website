import { negativeTestV2, negativeTestV3 } from '../templates/en/messages/about/negative-test';
import vaccination from '../templates/en/messages/about/vaccination';
import recovery from '../templates/en/messages/about/recovery';
import positiveTest from '../templates/en/messages/about/positive-test';
import footer from '../templates/en/footer';

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
            'pageIntro': '<h2 class="screen-reader-text">Here\'s how it works</h2><p>A certificate on paper is convenient if you don\'t have a smartphone. Here\'s how it works:</p><div class="home__section"><h4>Only access with a certificate</h4><p>Your and other people’s health matters. That is why some countries and places ask for a coronavirus pass. You’re only allowed to enter carrying this pass. You can make a coronavirus pass if you have been vaccinated, if a test result confirms you don’t have corona or if you\'ve had coronavirus and are recovered.</p></div><div class="home__section"><h4>QR code = your proof</h4><p>You can make a QR code of your test result or vaccination. That is your certificate. This QR code will be checked at the entrance of places or activities, or at the border.</p></div><div class="home__section"><h4>QR codes for the Netherlands and international</h4><p>You’ll get one QR code for the Netherlands and one for other countries. Travelling outside of the Netherlands? Then use your international QR code.</p></div>',
            'userConsentHeader': 'Start making a certificate on paper',
            'userConsentText': 'I have read the <a href="https://coronacheck.nl/en/privacy" target="_blank">privacy statement</a> and understand how CoronaCheck processes my data.',
            'noConsentError': 'Give consent to the privacy statement first'
        },
        'choiceProof': {
            'pageHeader': 'What certificate do you want to make?',
            'pageIntro': '<p>Indicate what kind of certificate you would like to make</p>',
            'choiceTestHeader': 'A test certificate',
            'choiceTestBody': 'The test proves I do not have coronavirus',
            'choiceRecoveryHeader': 'A recovery certificate',
            'choiceRecoveryBody': 'The test proves I have had coronavirus',
            'choiceVaccinationHeader': 'A vaccination certificate',
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
            'pageIntro': '<p>Have you been vaccinated? Log in with DigiD. Your vaccination details will be automatically retrieved.</p><p>Questions about vaccinations? Read more on the <a href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-vaccinatie" target="_blank">website of the Dutch Government</a></p>'
        },
        'VaccinationOverview': {
            'pageHeader': 'Your retrieved vaccinations',
            'pageIntro': '<p>You can make a QR code of your vaccination. This will be your certificate.</p>',
            'createTestProofButton': 'Make QR code'
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
        'collectRecovery': {
            'pageHeader': 'Retrieve recovery details',
            'pageIntro': '<p>Have you had coronavirus? Then you can make a recovery certificate of the positive test result from the GGD. Log in with DigiD to retrieve your test result.</p><p>Your recovery certificate will be valid 11 days after the positive test result. You also need to be symptom-free.</p>'
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
        'NegativeTestOverview': {
            'pageHeader': 'Check your test result',
            'pageIntro': '<p>This test result is retrieved from the test location.</p><p>Is the below correct? Then you can convert the negative test result into a QR code. This is your test certificate.</p>',
            'createTestProofButton': 'Make QR code',
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
        'recoveryOverview': {
            'pageHeader': 'Your retrieved positive test result',
            'pageIntro': '<p>Are your details correct? Then you can turn your positive test result into a QR code. This is your certificate.</p>'
        },
        'recoveryNone': {
            'pageHeader': 'No positive test result available',
            'pageIntro': '<p>There is no positive test result available.<p><p>Got tested recently? It can take a few hours until your details are available. Try again later.</p><p>Have you been tested more than 180 days ago? Then your test result is no longer valid. In this case, you cannot create a recovery certificate.</p>'
        },
        'recoveryNotPossible': {
            'pageHeader': 'We can\'t make a certificate',
            'pageIntro': 'At this moment, we can\'t make a certificate from your positive test result. This can have various causes. Read more <a href="https://coronacheck.nl/en/wegwijzer.html" target="_blank">here</a>.'
        },
        'print': {
            'openPDF': 'Open PDF'
        },
        'PrintNegativeTest': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '\n' +
                    '<p><b>Your certificates</b><br>You’ve made a test certificate, in the form of  a QR code. You’ve got a code for the Netherlands and one for other countries.</p><p><b>Information in the QR</b><br><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Read here</a> which information the QR code contains</p><p><b>What now?</b><br>Print the PDF and bring it with you to the location or activity you’re visiting. Or to the country you’re travelling to.</p>'
            },
            'domestic': {
                'pageHeader': 'Your test certificate',
                'pageIntro': 'You\'ve made a test certificate,  in the form of a QR code. Read which information the QR code contains. Print the PDF and take it with you.'
            }
        },
        'printVaccination': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<p><b>Your certificates</b><br>You’ve made a vaccination certificate, in the form of  a QR code. You’ve got a code for the Netherlands and one for other countries.</p><p><b>Information in the QR</b><br><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Read here</a> which information the QR code contains</p><p><b>What now?</b><br>Print the PDF and bring it with you to the location or activity you’re visiting. Or to the country you’re travelling to.</p><p>Please note: this paper certificate is valid for 1 year. After that, you can make a new paper certificate of your vaccination. </p>'
            },
            'european': {
                'pageHeader': 'Print your vaccination certificate',
                'pageIntro': '<h3>Your certificate</h3><p>You’ve made a vaccination certificate in the form of a QR code. You have a QR code for the Netherlands and one for other countries.</p><h3>Information in the QR</h3><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Read what is in the QR codes</a>.</p><h3>What now?</h3><p>Print the PDF and take your print to the location or activity you’re visiting.Or to the country you’re travelling to.</p> '
            }
            // domestic only is a non existing scenario for vaccination
        },
        'printRecovery': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<p><b>Your certificates</b><br>You’ve made a recovery certificate, in the form of  a QR code. You’ve got a code for the Netherlands and one for other countries.</p><p><b>Information in the QR</b><br><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Read here</a> which information the QR code contains</p><p><b>What now?</b><br>Print the PDF and bring it with you to the location or activity you’re visiting. Or to the country you’re travelling to.</p>'
            }
            // european only and domestic only is a non existing scenario for recovery
        }
    },
    'components': {
        'languagePicker': {
            'language': 'Language',
            'changeLanguage': 'Change language',
            'currentLanguage': 'Current language'
        },
        'faq': {
            'viewFaq': 'View frequently asked questions'
        },
        'preferMobile': {
            'header': 'Prefer having your certificate on mobile?',
            'intro': 'Then download the app. You can also make a print of the certificate in the app.'
        },
        'NegativeTest': {
            'resultNegative': 'Negative test result',
            'yourCredentials': 'Identification details'
        },
        'vaccination': {
            'vaccination': 'Vaccination',
            'name': 'Name',
            'dateOfBirth': 'Date of birth'
        },
        'recovery': {
            'title': 'Your recovery certificate'
        },
        'positiveTest': {
            'title': 'Your positive test result'
        },
        'proofEvent': {
            'name': 'Name',
            'dateOfTest': 'Test date',
            'dateOfBirth': 'Date of birth'
        },
        'digid': {
            'loginDigid': 'Log in with DigiD',
            'dontHaveDigid': 'I don’t have DigiD',
            'proofType': {
                'negativetest': 'test result',
                'vaccination': 'vaccinations',
                'positivetest': 'test result'
            }
        }
    },
    'message': {
        'info': {
            'testResultAbout': {
                'head': 'What has been retrieved?',
                'bodyV2': negativeTestV2,
                'bodyV3': negativeTestV3
            },
            'vaccinationAbout': {
                'head': 'What has been retrieved?',
                'body': vaccination
            },
            'recoveryAbout': {
                'head': 'What has been retrieved?',
                'body': recovery
            },
            'positiveTestResultAbout': {
                'head': 'What has been retrieved?',
                'body': positiveTest
            },
            'somethingWrong': {
                'vaccination': {
                    'head': 'Something is wrong',
                    'body': '<p>Wrong name or date of birth? Or are your vaccination details incorrect? Please go to <a href="https://www.coronacheck.nl/en/guidepost" target="_blank">CoronaCheck.nl/en/guidepost</a> for more information.</p>'
                },
                'negativetest': {
                    'head': 'Something is wrong',
                    'body': '<p>Do your details not match your ID? Please contact your test location to have your details adjusted.</p>'
                },
                'positivetest': {
                    'head': 'Something is wrong',
                    'body': '<p>Do your details not match your ID? Please contact your test location to have your details adjusted.</p>'
                }
            },
            'noVerificationCode': {
                'head': 'Need a new verification code?',
                'body': '<p>The test location sends you a verification code via text or email. Didn\'t get one? Then you can request a new code.</p>'
            },
            'didNotGetTestedYet': {
                'head': 'I haven’t been tested yet',
                'body': '<p>You must get tested before you make a QR code. You can only turn a negative test result into a QR code.</p><p>A test certificate is valid until 40 hours after the moment you’ve been tested. So schedule your test on time. And make sure your QR code is scanned at the entrance within 40 hours.</p><p><a href="https://coronacheck.nl/en/testafspraak-in-app" class="btn" target="_blank">Make an appointment\n</a></p>'
            },
            'areYouSureToCancel': {
                'head': 'Are you sure you want to stop?',
                'body': 'Then you need to log in again later using DigiD to retrieve your %{type}.',
                'yes': 'Yes, stop',
                'no': 'No, continue'
            },
            'digidCanceled': {
                'head': 'Login failed',
                'body': 'You can log in again to retrieve your %{type}',
                'vaccination': 'vaccinations',
                'negativetest': 'test result',
                'positiveetest': 'test result'
            },
            'digidFinished': {
                'body': 'We\'ll retrieve your %{type}. You will be logged out of DigiD automatically'
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
    'somethingIsWrong': 'Is something wrong?',
    'unknown': 'Unknown',
    'tooBusy': 'It\'s very busy right now, and therefore you cannot log in at the moment. Could you please try again later?'
}

export default en;
