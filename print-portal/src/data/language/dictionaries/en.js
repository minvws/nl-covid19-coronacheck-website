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
            'pageIntro': '<h2 class="screen-reader-text">Here\'s how it works</h2>' +
                '<p>Your and other people’s health matters. That is why some countries and places ask for a coronavirus pass. You’re only allowed to enter carrying this pass.</p>' +
                '<p>A certificate on paper is convenient if you don\'t have a smartphone.</p>' +
                '<h4>Certificate of test or vaccination</h4>' +
                '<p>You can make a coronavirus pass with CoronaCheck if:' +
                '<ul class="ul--with-padding"><li>you have been vaccinated</li><li>a test result confirms you don’t have corona</li><li>you\'ve had coronavirus and are recovered</li></ul></p>' +
                '<h4>QR code = your proof</h4>' +
                '<p>CoronaCheck generates a QR code with your vaccination, test result or recovery. That is your certificate. This QR code will be checked before you get access.</p>' +
                '<h4>QR codes for the Netherlands and international</h4>' +
                '<p>This app generates a QR code for the Netherlands and one for other countries. Travelling outside of the Netherlands? Then use your international QR code.</p>',
            'userConsentHeader': 'Start making a certificate on paper',
            'userConsentText': 'I have read the <a href="https://coronacheck.nl/en/privacy" target="_blank" rel="noopener noreferrer">privacy statement</a> and understand how CoronaCheck processes my data.',
            'noConsentError': 'Give consent to the privacy statement first'
        },
        'choiceProof': {
            'pageHeader': 'What certificate do you want to make?',
            'pageIntro': '',
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
            'pageHeader': 'Retrieve vaccination details',
            'pageIntro': '<p>Have you been vaccinated? Log in with DigiD. Your vaccination details will be automatically retrieved.</p>'
        },
        'vaccinationOverview': {
            'pageHeader': 'Your retrieved vaccinations',
            'pageIntro': '<p>You can make a QR code of your vaccination. This will be your certificate.</p>',
            'createTestProofButton': 'Make certificate'
        },
        'vaccinationsNone': {
            'pageHeader': 'No vaccination(s) available',
            'pageIntro': '<p>Details about your vaccination are not available.</p><p>Have you been vaccinated recently? It might take a little while before your details are available.</p><p>Your general practitioner might not be affiliated with the GGD. You can find more information about what to do on the <a href="https://www.coronacheck.nl/en/guidepost" target="_blank" rel="noopener noreferrer">Guidepost</a>.</p>'
        },
        'notPossibleVaccinations': {
            'pageHeader': 'We can’t make a certificate',
            'pageIntro': '<p>At the moment, we cannot provide proof of your vaccination. This can have different causes. <a href="https://www.coronacheck.nl/en/guidepost" target="_blank" rel="noopener noreferrer">Learn more about possible causes</a>.</p>'
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
            'unknownTestProvider': 'Retrieval code is from an unknown test location',
            'invalidTestCode': 'Invalid retrieval code',
            'tokenExpired': 'Retrieval code has expired',
            'invalidVerificationCode': 'Invalid verification code',
            'emptyVerificationCode': 'Verification code not entered',
            'sendCode': 'Send code'
        },
        'negativeTestOverview': {
            'pageHeader': 'Check your test result',
            'pageIntro': '<p>This test result is retrieved from the test location.</p><p>Is the below correct? Then you can convert the negative test result into a QR code. This is your test certificate.</p>',
            'createTestProofButton': 'Make certificate',
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
            'pageIntro': '<p>Are your details correct? Then you can turn your positive test result into a QR code. This is your certificate.</p>',
            'createTestProofButton': 'Make certificate'
        },
        'recoveryNone': {
            'pageHeader': 'No positive test result available',
            'pageIntro': '<p>There is no positive test result available.<p><p>Got tested recently? It can take a few hours until your details are available. Try again later.</p><p>Have you been tested more than 180 days ago? Then your test result is no longer valid. In this case, you cannot create a recovery certificate.</p>'
        },
        'print': {
            'openPDF': 'Open PDF'
        },
        'printNegativeTest': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<p><strong>Successful! A PDF of your test certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<h4>QR code for the Netherlands and abroad</h4>' +
                    'In the PDF, you’ll find two QR codes. A QR code for the Netherlands, and an international one. Are you crossing the border, or are you abroad right now? Then please use the international QR code.' +
                    '<p>Before leaving, please check which certificate you need.<br>' +
                    '<a href="https://www.nederlandwereldwijd.nl/reizen/reisadviezen" target="_blank" rel="noopener noreferrer">Is my certificate valid in the country I’m traveling to?</a></p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the place or activity you’re visiting. Or to the country you’re traveling to.</p>'
            },
            'european': {
                'pageHeader': 'Print your international certificate',
                'pageIntro': '<p><strong>Successful! A PDF of your test certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<h4>QR code for abroad</h4>' +
                    '<p>In the PDF you will only find an international QR code. You can use this if you are abroad or cross the border, but not in the Netherlands.</p>' +
                    '<p>The validity period of your QR code may be shorter in the Netherlands than in other countries. Get tested again for a certificate that is also valid in the Netherlands.</p>' +
                    '<p>Before leaving, please check which certificate you need.<br>' +
                    '<a href="https://www.nederlandwereldwijd.nl/reizen/reisadviezen" target="_blank" rel="noopener noreferrer">Is my certificate valid in the country I’m traveling to?</a></p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the country you’re traveling to.</p>'
            },
            'domestic': {
                'pageHeader': 'Print your Dutch recovery certificate',
                'pageIntro': '<p><strong>Successful! A PDF of your test certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<h4>Only a Dutch QR code</h4>' +
                    '<p>In the PDF, you’ll only find a Dutch QR code. You can use it to access places or activities within the Netherlands, but not when your travelling abroad or crossing the border.</p>' +
                    '<p>It can be that you didn’t get an international QR code because your type of test isn\'t accepted abroad. An international recovery certificate can only be made with a PCR-test.</p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the place or activity you’re visiting.</p>'
            }
        },
        'printVaccination': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<p><strong>Successful! A PDF of your vaccination certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<h4>QR code for the Netherlands and abroad</h4>' +
                    'In the PDF, you’ll find two QR codes. A QR code for the Netherlands, and an international one. Are you crossing the border, or are you abroad right now? Then please use the international QR code.' +
                    '<p>Before leaving, please check which certificate you need.<br>' +
                    '<a href="https://www.nederlandwereldwijd.nl/reizen/reisadviezen" target="_blank" rel="noopener noreferrer">Is my certificate valid in the country I’m traveling to?</a></p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the place or activity you’re visiting. Or to the country you’re traveling to.</p>' +
                    '<p>Please note: this paper certificate is valid for 1 year. After that, you can make a new vaccination certificate.</p>'
            },
            'european': {
                'pageHeader': 'Print your international certificate',
                'pageIntro': '<p><strong>Successful! A PDF of your vaccination certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<h4>QR code for abroad</h4>' +
                    '<p>In the PDF you will only find an international QR code. You can use this if you are abroad or cross the border, but not in the Netherlands.</p>' +
                    '<p>You may not have received a Dutch QR code because you only had one injection. After your second vaccination, you can create a new certificate that is also valid in the Netherlands. ' +
                    '<a href="https://coronacheck.nl/en/faq/2-4-ik-heb-wel-een-internationale-qr-code-maar-geen-nederlandse/" target="_blank" rel="noopener noreferrer">Read more about the possible causes here</a>.</p>' +
                    '<p>Before leaving, please check which certificate you need.<br>' +
                    '<a href="https://www.nederlandwereldwijd.nl/reizen/reisadviezen" target="_blank" rel="noopener noreferrer">Is my certificate valid in the country I’m traveling to?</a></p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the country you’re traveling to.</p>' +
                    '<p>Please note: this paper certificate is valid for 1 year. After that, you can make a new vaccination certificate.</p>'
            }
            // domestic only is a non existing scenario for vaccination
        },
        'printRecovery': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<p><strong>Successful! A PDF of your recovery certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<h4>QR code for the Netherlands and abroad</h4>' +
                    'In the PDF, you’ll find two QR codes. A QR code for the Netherlands, and an international one. Are you crossing the border, or are you abroad right now? Then please use the international QR code.' +
                    '<p>Before leaving, please check which certificate you need.<br>' +
                    '<a href="https://www.nederlandwereldwijd.nl/reizen/reisadviezen" target="_blank" rel="noopener noreferrer">Is my certificate valid in the country I’m traveling to?</a></p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the place or activity you’re visiting. Or to the country you’re traveling to.</p>'
            },
            'domestic': {
                'pageHeader': 'Print your Dutch recovery certificate',
                'pageIntro': '<p><strong>Successful! A PDF of your recovery certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<h4>Only a Dutch QR code</h4>' +
                    '<p>In the PDF, you’ll only find a Dutch QR code. You can use it to access places or activities within the Netherlands, but not when your travelling abroad or crossing the border.</p>' +
                    '<p>It can be that you didn’t get an international QR code because your type of test isn\'t accepted abroad. An international recovery certificate can only be made with a PCR-test.</p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the place or activity you’re visiting.</p>'
            },
            // european only is a non existing scenario for recovery
            'bothValidInFuture': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<p><strong>Successful! A PDF of your recovery certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<p>Your recovery certificate will be valid 11 days after the positive test result. You also need to be free of symptoms.</p>' +
                    '<h4>QR code for the Netherlands and abroad</h4>' +
                    'In the PDF, you’ll find two QR codes. A QR code for the Netherlands, and an international one. Are you crossing the border, or are you abroad right now? Then please use the international QR code.' +
                    '<p>Before leaving, please check which certificate you need.<br>' +
                    '<a href="https://www.nederlandwereldwijd.nl/reizen/reisadviezen" target="_blank" rel="noopener noreferrer">Is my certificate valid in the country I’m traveling to?</a></p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the place or activity you’re visiting. Or to the country you’re traveling to.</p>'
            },
            'domesticValidInFuture': {
                'pageHeader': 'Print your Dutch recovery certificate',
                'pageIntro': '<p><strong>Successful! A PDF of your recovery certificate has been made. There’s a QR code on the PDF you can have scanned.</strong></p>' +
                    '<p>Your recovery certificate will be valid 11 days after the positive test result. You also need to be free of symptoms.</p>' +
                    '<h4>Only a Dutch QR code</h4>' +
                    '<p>In the PDF, you’ll only find a Dutch QR code. You can use it to access places or activities within the Netherlands, but not when your travelling abroad or crossing the border.</p>' +
                    '<p>It can be that you didn’t get an international QR code because your type of test isn\'t accepted abroad. An international recovery certificate can only be made with a PCR-test.</p>' +
                    '<h4>What now?</h4>' +
                    '<p>Open the PDF, and print it. Take it to the place or activity you’re visiting.</p>'
            }
        },
        'serverBusy': {
            'pageHeader': 'Sorry, it is really busy',
            'pageIntro': '<p>Please try again later.</p>'
        },
        'errorNoEvents': {
            'pageHeader': 'Sorry, your details were not retrieved',
            'pageIntro': '<p>Due to increased traffic or an outage at one of the involved parties, some details of your %{type} may be missing. </p><p>Tip: wait one hour and try again.</p>'
        },
        'errorTokenFlow': {
            'pageHeader': 'Sorry, something has gone wrong',
            'pageIntro': '<p>Something is going wrong at the test location. Therefore, your details can’t be retrieved.</p><h4>What now?</h4><p>Contact the test location and give them the following error code:</p><p><strong>Error code: %{error}</strong></p>'
        },
        'errorGeneral': {
            'pageHeader': 'Sorry, something has gone wrong',
            'pageIntro': '<p>Try again later or view the latest outages at <a href="https://status.coronacheck.nl/en/">https://status.coronacheck.nl/en/</a></p><p><strong>Error code(s)</strong><br>%{errors}</p>'
        },
        'errorNoBsn': {
            'pageHeader': 'No social security number found',
            'pageIntro': '<p>The healthcare provider who vaccinated or tested you can help you further. Contact them and let them know CoronaCheck couldn’t find a social security number.</p>'
        },
        'errorSessionExpired': {
            'pageHeader': 'Your session has expired',
            'pageIntro': '<p>You’ve waited too long. For safety reasons, you were logged out. Login again with your DigiDto retrieve your details.</p>'
        },
        'errorProofNotPossible': {
            'pageHeader': 'We can’t make a certificate',
            'pageIntro': '<p>At this moment, we can\'t make a certificate. This can have various causes. Read more on the <a href="https://www.coronacheck.nl/en/guidepost" target="_blank" rel="noopener noreferrer">Guidepost</a>.</p>'
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
        'eventInfo': {
            'head': 'What has been retrieved?',
            'name': 'Name',
            'dateOfBirth': 'Date of birth',
            'dateOfTest': 'Test date',
            'testResult': 'Test result',
            'validFrom': 'Valid From',
            'validUntil': 'Valid until',
            'eventsFetchedAt': 'Data retrieved at'
        },
        'test': {
            'resultNegative': 'Negative test result',
            'yourCredentials': 'Identification details',
            'info': {
                'detailsRetrieved': 'The following details were retrieved at the test location',
                'testType': 'Type test',
                'testName': 'Test name',
                'testResultNegative': 'negative (no corona)',
                'testResultPositive': 'positive (corona)',
                'testLocation': 'Test location',
                'testManufacturer': 'Test manufacturer',
                'testCountry': 'Tested in',
                'identificationCode': 'Unique test identifier'
            }
        },
        'vaccination': {
            'vaccination': 'Vaccination',
            'info': {
                'detailsRetrieved': 'The following details of your vaccination have been retrieved at %{provider}',
                'pathogen': 'Pathogen',
                'vaccine': 'Vaccine',
                'vaccineType': 'Vaccine type',
                'manufacturer': 'Manufacturer',
                'doses': 'Doses',
                'finalDosis': 'Is this the last dose of your vaccination?',
                'vaccinationDate': 'Vaccination date',
                'vaccinationCountry': 'Country of vaccination',
                'identificationCode': 'Unique vaccination identifier',
                'finalDosisValue': {
                    'yes': 'Yes',
                    'recovery': 'Yes (I\'ve had coronavirus earlier)',
                    'prior': 'Yes (I have been vaccinated elsewhere)',
                    'no': 'No',
                    'unknown': 'Unknown'
                }
            }
        },
        'recovery': {
            'title': 'Recovery certificate',
            'info': {
                'detailsRetrieved': 'The following details were retrieved at the test location'
            }
        },
        'positiveTest': {
            'title': 'Positive test result',
            'info': {
                'detailsRetrieved': 'The following details were retrieved at the test location'
            }
        },
        'digid': {
            'loginDigid': 'Log in with DigiD',
            'dontHaveDigid': 'I don’t have DigiD',
            'proofType': {
                'negativetest': 'test result',
                'vaccination': 'vaccinations',
                'positivetest': 'test result',
                'positivetest,recovery': 'test result'
            }
        }
    },
    'message': {
        'info': {
            'somethingWrong': {
                'vaccination': {
                    'head': 'Something is wrong',
                    'body': '<p>Wrong name or date of birth? Or are your vaccination details incorrect? Please go to <a href="https://www.coronacheck.nl/en/guidepost" target="_blank" rel="noopener noreferrer">CoronaCheck.nl/en/guidepost</a> for more information.</p>'
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
                'body': '<p>You must get tested before you make a QR code. You can only turn a negative test result into a QR code.</p><p>A test certificate is valid until 24 hours after the moment you\'ve been tested. So schedule your test on time. And make sure your QR code is scanned at the entrance within 24 hours.</p><p><a href="https://coronacheck.nl/en/testafspraak-in-app" class="btn" target="_blank" rel="noopener noreferrer">Make an appointment\n</a></p>'
            },
            'areYouSureToCancel': {
                'head': 'Are you sure you want to stop?',
                'body': 'You will then have to retrieve your data later again.',
                'yes': 'Yes, stop',
                'no': 'No, continue'
            },
            'digidCanceled': {
                'head': 'Login was cancelled',
                'body': 'Want to retrieve your %{type}? Log in again with DigiD.',
                'vaccination': 'vaccination details',
                'negativetest': 'test details',
                'positivetest': 'recovery details'
            },
            'digidFinished': {
                'body': 'We\'ll retrieve your %{type}. You will be logged out of DigiD automatically'
            },
            'sessionEnded': {
                'head': 'Your session has ended',
                'body': 'For safety, your session will automatically stop after 24 hours. '
            }
        },
        'error': {
            'general': {
                'head': 'Sorry, something went wrong',
                'body': '<p>Because of a technical error. Contact the CoronaCheck helpdesk.</p>'
            },
            'noInternet': {
                'head': 'You\'re not connected to the internet',
                'body': 'Check your connection and try again.'
            },
            'collectEventsWithErrors': {
                'head': 'Are these all your vaccinations?',
                'body': '<p>Due to increased traffic or an outage, some of your details may be missing. Are you missing a vaccination? Please come back later and retrieve your details again.</p>'
            }
        }
    },
    'pdf': {
        'metadata': {
            'title': 'Certificate containing QR code',
            'author': 'CoronaCheck'
        }
    },
    'and': 'And',
    'back': 'Back',
    'close': 'Close',
    'details': 'Details',
    'faq': 'Frequently asked questions',
    'forInstanceAbbr': 'E.g.',
    'goBackToStart': 'To Home',
    'header-appstore': 'Download on the App Store',
    'header-googleplaystore': 'Get it on Google Play',
    'identity_image_alt': 'Make Holder QR code',
    'logo-government': 'Logo Dutch Government, homepage',
    'next': 'Next',
    'of': 'of',
    'pageTitle': 'CoronaCheck Print Portal',
    'skiplink': 'Skip to content',
    'somethingIsWrong': 'Is something wrong?',
    'unknown': 'Unknown',
    'tooBusy': 'It\'s very busy right now, and therefore you cannot log in at the moment. Could you please try again later?'
}

export default en;
