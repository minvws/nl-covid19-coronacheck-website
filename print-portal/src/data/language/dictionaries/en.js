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
            'pageIntro': '<h2 class="screen-reader-text">Here\'s how it works</h2><p>A certificate on paper is convenient if you don\'t have a smartphone. Here\'s how it works:</p><div class="home__section"><h3>Only access with a certificate</h3><p>Your and other people’s health matters. That is why some countries and places ask for a coronavirus pass. You’re only allowed to enter carrying this pass. You can make a coronavirus pass if you have been vaccinated, if a test result confirms you don’t have corona or if you\'ve had coronavirus and are recovered.</p></div><div class="home__section"><h3>QR code = your proof</h3><p>You can make a QR code of your test result or vaccination. That is your certificate. This QR code will be checked at the entrance of places or activities, or at the border.</p></div><div class="home__section"><h3>QR codes for the Netherlands and international</h3><p>You’ll get one QR code for the Netherlands and one for other countries. Travelling outside of the Netherlands? Then use your international QR code.</p></div>',
            'userConsentHeader': 'Start making a certificate on paper',
            'userConsentText': 'I have read the <a href="https://coronacheck.nl/en/privacy" target="_blank" rel="noopener noreferrer">privacy statement</a> and understand how CoronaCheck processes my data.',
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
            'pageIntro': '<p>Have you been vaccinated? Log in with DigiD. Your vaccination details will be automatically retrieved.</p><p>Questions about vaccinations? Read more on the <a href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-vaccinatie" target="_blank" rel="noopener noreferrer">website of the Dutch Government</a></p>'
        },
        'vaccinationOverview': {
            'pageHeader': 'Your retrieved vaccinations',
            'pageIntro': '<p>You can make a QR code of your vaccination. This will be your certificate.</p>',
            'createTestProofButton': 'Make QR code'
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
        'print': {
            'openPDF': 'Open PDF'
        },
        'printNegativeTest': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<h4>Your certificates</h4><p>You\'ve made a test certificate, in the form of  a QR code. You\'ve got a code for the Netherlands and one for other countries.</p><h4>Information in the QR</h4><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">This is what\'s in the QR codes</a>.</p><h4>What now?</h4><p>Print the PDF and bring it with you to the location or activity you’re visiting. Or to the country you’re travelling to.</p>'
            },
            'european': {
                'pageHeader': 'Your certificate',
                'pageIntro': '<h4>Your certificate</h4><p>You\'ve made a test certificate in the form of a QR code. You\'ve only got an international certificate. A dutch certificate could not be made because the type of test is not accepted, or because the test certificate already expired in the Netherlands.</p><h4>Information in the QR</h4><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Read what is in the QR codes</a>.</p><h4>What now?</h4><p>Print the PDF and take your print to the location or activity you’re visiting.Or to the country you’re travelling to.</p>'
            },
            'domestic': {
                'pageHeader': 'Your certificate',
                'pageIntro': '<h4>Your certificate</h4><p>You\'ve made a test certificate in the form of a QR code. This QR code is valid within the Netherlands, but not abroad.</p><h4>Information in the QR</h4><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Read what is in the QR codes</a>.</p><h4>What now?</h4><p>Print the PDF and take your print to the location or activity you’re visiting.</p>'
            }
        },
        'printVaccination': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<h4>Your certificates</h4><p>You\'ve made a vaccination certificate, in the form of  a QR code. You\'ve got a code for the Netherlands and one for other countries.</p><h4>Information in the QR</h4><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">This is what\'s in the QR codes</a>.</p><h4>What now?</h4><p>Print the PDF and bring it with you to the location or activity you’re visiting. Or to the country you’re travelling to.</p><p>Please note: this paper certificate is valid for 1 year. After that, you can make a new paper certificate of your vaccination.</p>'
            },
            'european': {
                'pageHeader': 'Print your vaccination certificate',
                'pageIntro': '<h4>Your certificate</h4><p>You\'ve made a vaccination certificate in the form of a QR code. You\'ve only got an international certificate. This could be because you\'ve only had one of your vaccinations yet. Try making a Dutch certificate again when you’re fully vaccinated.</p><h4>Information in the QR</h4><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Read what is in the QR codes</a>.</p><h4>What now?</h4><p>Print the PDF and take your print to the location or activity you’re visiting.Or to the country you’re travelling to.</p><p>Please note: this paper certificate is valid for 1 year. After that, you can make a new paper certificate of your vaccination.</p>'
            }
            // domestic only is a non existing scenario for vaccination
        },
        'printRecovery': {
            'both': {
                'pageHeader': 'Print your certificates',
                'pageIntro': '<h4>Your certificates</h4><p>You\'ve made a recovery certificate, in the form of  a QR code. You\'ve got a code for the Netherlands and one for other countries.</p><h4>Information in the QR</h4><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">This is what\'s in the QR codes</a>.</p><h4>What now?</h4><p>Print the PDF and bring it with you to the location or activity you’re visiting. Or to the country you’re travelling to.</p>'
            },
            'domestic': {
                'pageHeader': 'Print your certificate',
                'pageIntro': '<h4>Your certificate</h4><p>You\'ve made a recovery certificate in the form of a QR code. This QR code is valid within the Netherlands, but not abroad.</p><h4>Information in the QR</h4><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">This is what\'s in the QR codes</a>.</p><h4>What now?</h4><p>Print the PDF and take your print to the location or activity you’re visiting.</p>'
            },
            // european only is a non existing scenario for recovery
            'validInFuture': {
                'pageIntro': '<h4>Your certificates</h4><p>You\'ve made a recovery certificate, in the form of  a QR code. You\'ve got a code for the Netherlands and one for other countries.</p><p>Your recovery certificate will be valid 11 days after the positive test result.</p><h4>Information in the QR</h4><p><a href="https://coronacheck.nl/en/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">This is what\'s in the QR codes</a>.</p><h4>What now?</h4><p>Print the PDF and bring it with you to the location or activity you’re visiting. Or to the country you’re travelling to.</p>'
            }
        },
        'serverBusy': {
            'pageHeader': 'It\'s very busy at the moment',
            'pageIntro': '<p>Try again later today.</p>'
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
            'pageIntro': '<p>At the moment, we cannot provide proof for you. This can have different causes. You can find more information about what to do on the <a href="https://www.coronacheck.nl/en/guidepost" target="_blank" rel="noopener noreferrer">Guidepost</a>.</p>'
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
                'body': 'Then you need to log in again later using DigiD to retrieve your %{type}.',
                'yes': 'Yes, stop',
                'no': 'No, continue'
            },
            'digidCanceled': {
                'head': 'Login aborted',
                'body': 'You can log in again to retrieve your %{type}.',
                'vaccination': 'vaccination details',
                'negativetest': 'test result',
                'positivetest': 'test result'
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
            'title': 'Certificate containing QR-code',
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
    'skiplink': 'Skip to content',
    'somethingIsWrong': 'Is something wrong?',
    'unknown': 'Unknown',
    'tooBusy': 'It\'s very busy right now, and therefore you cannot log in at the moment. Could you please try again later?'
}

export default en;
