import footer from '../templates/nl/footer';

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
            'pageIntro': '<h2 class="screen-reader-text">Zo werkt het</h2>' +
                '<p>Jouw gezondheid en die van anderen is belangrijk. Daarom vragen sommige landen of plekken om een coronabewijs. Alleen met dit bewijs krijg je toegang.</p>' +
                '<p>Een bewijs op papier is handig als je geen smartphone hebt.</p>' +
                '<h4>Bewijs van test of vaccinatie</h4>' +
                '<p>Je kan een coronabewijs maken met CoronaCheck als:' +
                '<ul class="ul--with-padding"><li>je bent gevaccineerd</li><li>uit een test blijkt dat je geen corona had</li><li>uit een test blijkt dat je corona hebt gehad en bent hersteld</li></ul></p>' +
                '<h4>QR-code = jouw bewijs</h4>' +
                '<p>CoronaCheck maakt van jouw vaccinatie of testuitslag een QR-code. Dat is jouw bewijs. De QR-code wordt gecheckt voordat je toegang krijgt.</p>' +
                '<h4>QR-codes voor Nederland en internationaal</h4>' +
                '<p>CoronaCheck maakt twee QR-codes: één voor Nederland en een internationale. Ben je in het buitenland of ga je de grens over? Gebruik dan altijd de internationale QR-code.</p>',
            'userConsentHeader': 'Maak een papieren bewijs',
            'userConsentText': 'Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank" rel="noopener noreferrer">privacyverklaring</a> gelezen en begrijp hoe CoronaCheck mijn gegevens gebruikt',
            'noConsentError': 'Ga eerst akkoord met de privacyverklaring'
        },
        'choiceProof': {
            'pageHeader': 'Welk papieren bewijs wil je maken?',
            'pageIntro': '',
            'choiceTestHeader': 'Een testbewijs',
            'choiceTestBody': 'Uit de test blijkt dat ik geen corona heb',
            'choiceRecoveryHeader': 'Een herstelbewijs',
            'choiceRecoveryBody': 'Uit de test blijkt dat ik corona heb gehad',
            'choiceVaccinationHeader': 'Een vaccinatiebewijs',
            'choiceVaccinationBody': 'Ik heb mijn prik of prikken gehad'
        },
        'choiceTestLocation': {
            'pageHeader': 'Waar ben je getest?',
            'pageIntro': '<p>Blijkt uit de test dat je geen corona hebt? Dan kan je van de testuitslag een QR-code maken. Geef aan waar je getest bent.</p>',
            'choiceGGDHead': 'GGD',
            'choiceGGDBody': 'Log in met DigiD',
            'loginDigid': 'Ik heb geen DigiD',
            'choiceOtherLocation': 'Andere testlocatie',
            'didNotGetTestedYet': 'Ik ben nog niet getest'
        },
        'collectVaccination': {
            'pageHeader': 'Gegevens van je vaccinatie ophalen',
            'pageIntro': '<p>Ben je al gevaccineerd? Log in met DigiD. De gegevens van je vaccinatie worden dan automatisch opgehaald.</p>'
        },
        'vaccinationOverview': {
            'pageHeader': 'Kloppen de gegevens?',
            'pageIntro': '<p>Als de gegevens van je vaccinatie kloppen kun je een bewijs maken.</p>',
            'createTestProofButton': 'Maak bewijs'
        },
        'vaccinationsNone': {
            'pageHeader': 'Geen vaccinatie(s) beschikbaar',
            'pageIntro': '<p>Er zijn geen gegevens over je vaccinatie beschikbaar.</p><p>Ben je kortgeleden gevaccineerd? Dan kan het even duren voordat je gegevens beschikbaar zijn.<p>Het kan zijn dat jouw huisarts niet is aangesloten op de GGD. Op de <a href="https://coronacheck.nl/wegwijzer" target="_blank" rel="noopener noreferrer">Wegwijzer</a> vind je meer informatie.</a></p>'
        },
        'notPossibleVaccinations': {
            'pageHeader': 'We kunnen geen bewijs maken',
            'pageIntro': '<p>Op dit moment kunnen we geen bewijs maken van jouw vaccinatie. Dit kan verschillende oorzaken hebben. <a href="https://coronacheck.nl/wegwijzer" target="_blank" rel="noopener noreferrer">Meer informatie over mogelijke oorzaken</a>.</p>'
        },
        'vaccinationsIncomplete': {
            'pageHeader': 'We kunnen geen bewijs maken',
            'pageIntro': '<p>Op dit moment kunnen we geen bewijs maken. Voor een Nederlands bewijs moet je volledig gevaccineerd zijn.</p>'
        },
        'collectRecovery': {
            'pageHeader': 'Gegevens van je herstel ophalen',
            'pageIntro': '<p>Heb je corona gehad? Dan kun je van de positieve testuitslag een herstelbewijs maken. Log in met DigiD om een testuitslag op te halen.</p>' +
                '<p>Je herstelbewijs wordt 11 dagen na de positieve testuitslag geldig. Je moet dan ook vrij zijn van klachten.</p>'
        },
        'collectPositiveTest': {
            'pageHeader': 'Testuitslag ophalen'
        },
        'provideCode': {
            'pageHeader': 'Testuitslag ophalen',
            'pageIntro': 'Vul jouw ophaalcode in. Deze heb je van je testlocatie gekregen.',
            'uniqueCode': 'Ophaalcode',
            'verificationCode': 'Verificatiecode',
            'verificationCodeDirection': 'Je krijgt een code in een sms of e-mail',
            'sendAgain': 'Verstuur opnieuw',
            'didNotGetCode': 'Ik heb geen code gekregen',
            'emptyTestCode': 'Ophaalcode niet ingevuld',
            'unknownTestProvider': 'De testlocatie is ons niet bekend. Neem contact op met de locatie waar je getest bent.',
            'invalidTestCode': 'Geen geldige ophaalcode',
            'tokenExpired': 'Ophaalcode is niet meer geldig',
            'invalidVerificationCode': 'Geen geldige verificatiecode',
            'emptyVerificationCode': 'Verificatiecode niet ingevuld',
            'sendCode': 'Stuur code'
        },
        'negativeTestOverview': {
            'pageHeader': 'Controleer je testuitslag',
            'pageIntro': '<p>Deze testuitslag is opgehaald bij de testlocatie. Kloppen de gegevens? Dan kun je een QR-code maken van je testuitslag. Dat is jouw bewijs.</p>',
            'createTestProofButton': 'Maak bewijs',
            'retrievedTestResult': 'Opgehaalde testuitslag'
        },
        'testResultPending': {
            'pageHeader': 'Testuitslag nog niet bekend',
            'pageIntro': 'Probeer het later nog eens.<br>Neem voor vragen contact op met jouw testlocatie.'
        },
        'testResultNone': {
            'pageHeader': 'Geen testuitslag beschikbaar',
            'pageIntro': '<p>Er zijn geen gegevens over je testuitslag beschikbaar. Dit kan verschillende oorzaken hebben. Kijk voor meer informatie op de <a href="https://coronacheck.nl/nl/wegwijzer.html" target="_blank" rel="noopener noreferrer">Wegwijzer</a>.</p><p>Heb je al een testuitslag van de GGD gekregen? Dan kan het nog een paar uur duren voordat je de uitslag hier kunt ophalen. Probeer het later opnieuw.</p>'
        },
        'recoveryOverview': {
            'pageHeader': 'Kloppen de gegevens?',
            'pageIntro': '<p>Als de gegevens van je test kloppen kun je een bewijs maken.</p>',
            'createTestProofButton': 'Maak bewijs'
        },
        'recoveryExpired': {
            'pageHeader': 'Positieve testuitslag niet meer geldig',
            'pageIntro': '<p>Het is langer dan %{days} dagen geleden dat je positief getest bent op corona. Daarom is je testuitslag niet meer geldig. Je kunt helaas geen herstelbewijs maken.</p><p>Kijk voor meer informatie op de <a href="https://coronacheck.nl/nl/wegwijzer.html" target="_blank" rel="noopener noreferrer">Wegwijzer</a>.</p>'
        },
        'recoveryNone': {
            'pageHeader': 'Geen positieve testuitslag beschikbaar',
            'pageIntro': '<p>Ben je net getest? Het kan een paar uur  duren voordat jouw positieve testuitslag beschikbaar is. Probeer het later nog eens.</p><p>Al even geleden getest? Neem dan contact op met je testlocatie om te controleren of je gegevens goed in het systeem staan.</p>'
        },
        'recoveryInvalid': {
            'pageHeader': 'Jou positieve testuitslag is niet geschikt',
            'pageIntro': '<p>Je bent positief getest ná je eerste vaccinatie. Daardoor is je testuitslag niet geschikt om een Nederlands bewijs van te maken</p><p>Kijk voor meer informatie bij de <a href="https://coronacheck.nl/nl/faq/2-4-ik-heb-wel-een-internationale-qr-code-maar-geen-nederlandse/" target="_blank" rel="noopener noreferrer">meestgestelde vragen</a>.</p>'
        },
        'print': {
            'pageTitle': 'Jouw bewijs',
            'pageHeader': {
                'domestic': 'Gelukt! Jouw bewijs staat hieronder klaar',
                'european': 'Gelukt! Jouw bewijs staat hieronder klaar',
                'both': 'Gelukt! Jouw bewijzen staan hieronder klaar'
            },
            'pageIntro': {
                'domestic': '<p>Je hebt alleen een %{type}bewijs voor in Nederland. Deze kun je gebruiken voor toegang tot plekken en activiteiten binnen Nederland, maar niet als je de grens over gaat of in het buitenland bent.</p><p>Open de PDF en print deze uit. Neem je geprinte bewijs mee naar de plek of activiteit die je bezoekt.</p>',
                'european': '<p>Je hebt alleen een internationaal %{type}bewijs. Deze kun je gebruiken als je in het buitenland bent of de grens over gaat, maar niet in Nederland.</p><p>Open de PDF en print deze uit. Neem je geprinte bewijs mee naar het land waar je heen reist.</p>',
                'both': '<p>Je hebt een Nederlands en een internationaal %{type}bewijs. Ga je de grens over of ben je in het buitenland? Gebruik dan jouw internationale bewijs.</p><p>Open de PDF’s en print deze uit. Neem je geprinte bewijs mee naar de plek of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>',
                'bothVaccinationRecovery': '<p>Je hebt een Nederlands en een internationaal bewijs. Ga je de grens over of ben je in het buitenland? Gebruik dan jouw internationale bewijs.</p><p>Open de PDF’s en print deze uit. Neem je geprinte bewijs mee naar de plek of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
            },
            'proofType': {
                'vaccination': 'vaccinatie',
                'recovery': 'herstel',
                'negativetest': 'test'
            },
            'validInFuture': '<p>Let op: jouw herstelbewijs wordt 11 dagen na de positieve testuitslag geldig. Je moet dan ook vrij zijn van klachten.</p>',
            'details': {
                'header': 'Meer informatie over jouw bewijs',
                'set': {
                    'validPeriod': {
                        'summary': 'Hoe lang is mijn papieren bewijs geldig?',
                        'content': '<p>Dit papieren bewijs is 1 jaar geldig. Daarna kan je een nieuw papieren bewijs maken van je vaccinatie.</p>'
                    },
                    'validLocation': {
                        'summary': 'Waar is mijn internationale bewijs geldig?',
                        'content': '<p>De geldigheid van coronabewijzen verschilt per land. Controleer daarom voor vertrek welk bewijs je nodig hebt op jouw bestemming op <a href="https://www.nederlandwereldwijd.nl/reizen/reisadviezen" target="_blank" rel="noopener noreferrer">www.wijsopreis.nl</a>.</p>'
                    },
                    'whyNoDomesticVaccination': {
                        'summary': 'Waarom krijg ik geen Nederlands vaccinatiebewijs?',
                        'content': '<p>Voor een Nederlands vaccinatiebewijs moet je volledig gevaccineerd zijn, of hersteld van corona vóór je eerste prik.</p>'
                    },
                    'whyNoDutchCertificate': {
                        'summary': 'Corona gehad voor je eerste prik?',
                        'content': '<p>Haal je positieve testuitslag op. Je krijgt dan ook een Nederlands bewijs.</p>',
                        'label': 'Haal mijn testuitslag op'
                    },
                    'whyNoEuropeanRecovery': {
                        'summary': 'Waarom krijg ik geen internationaal herstelbewijs?',
                        'content': '<p>Dat je geen internationaal herstelbewijs hebt gekregen, kan bijvoorbeeld komen doordat je type test niet voldoet, of deze niet meer geldig is in het buitenland. Alleen van een PCR-test die minder dan 180 dagen oud is kan een internationaal herstelbewijs gemaakt worden. Lees meer over de mogelijke oorzaken op de <a href="https://coronacheck.nl/nl/wegwijzer" target="_blank" rel="noopener noreferrer">Wegwijzer</a>.</p>'
                    },
                    'whyNoEuropeanTest': {
                        'summary': 'Waarom krijg ik geen internationaal testbewijs?',
                        'content': '<p>Dat je geen internationaal testbewijs hebt gekregen, kan komen doordat het type test niet geaccepteerd wordt in andere landen. Laat je opnieuw testen voor een bewijs dat ook internationaal geldig is.</p>'
                    },
                    'whyNoDomesticTest': {
                        'summary': 'Waarom krijg ik geen Nederlands testbewijs?',
                        'content': '<p>Dat je geen Nederlands testbewijs hebt gekregen, kan komen doordat de geldigheidsduur van een test in Nederland korter is dan in andere landen. Laat je opnieuw testen voor een bewijs dat ook in Nederland geldig is.</p>'
                    }
                }
            }
        },
        'serverBusy': {
            'pageHeader': 'Sorry, het is erg druk',
            'pageIntro': '<p>Probeer het op een later moment nog eens.</p>' +
                '<p><strong>Foutcode</strong><br>%{error}</p>' +
                '<p><a href="https://status.coronacheck.nl/">Bekijk de actuele storingen</a></p>'
        },
        'errorNoEvents': {
            'pageHeader': 'Sorry, het is niet gelukt',
            'pageIntro': '<p>Door drukte of een storing bij een van de partijen hebben we geen gegevens over je %{type} kunnen ophalen.</p><p>Tip: wacht een uur en probeer het dan nog een keer.</p>'
        },
        'errorTokenFlow': {
            'pageHeader': 'Sorry, er gaat iets mis',
            'pageIntro': '<p>Er gaat iets mis bij de testlocatie. Daardoor kunnen jouw gegevens niet worden opgehaald.</p><h4>Wat nu?</h4><p>Neem contact op met je testlocatie en geef de volgende foutcode door:</p><p><strong>Foutcode: %{error}</strong></p>'
        },
        'errorDigiD': {
            'pageHeader': 'Sorry, er gaat iets mis',
            'pageIntro': '<p>Er is een fout opgetreden in de communicatie met DigiD. Probeert u het later nogmaals. Indien deze fout blijft aanhouden, kijk dan op de website <a href="https://www.digid.nl/" target="_blank">www.digid.nl</a> voor de laatste informatie.</p><p><strong>Foutcode: %{error}</strong></p>'
        },
        'errorGeneral': {
            'pageHeader': 'Sorry, er gaat iets mis',
            'pageIntro': '<p>Er gaat iets mis bij het maken van je bewijs. Wil je het later nog eens proberen?</p><p><strong>Foutcode(s)</strong><br>%{errors}</p><p><a href="https://status.coronacheck.nl/">Bekijk de actuele storingen</a></p>'
        },
        'errorNoBsn': {
            'pageHeader': 'Geen BSN gevonden',
            'pageIntro': '<p>De zorgverlener waar je gevaccineerd of getest bent kan je verder helpen. Neem contact op en geef door dat CoronaCheck geen BSN gevonden heeft.</p>'
        },
        'errorSessionExpired': {
            'pageHeader': 'Je sessie is verlopen',
            'pageIntro': '<p>Je hebt te lang gewacht. Voor de veiligheid ben je daarom uitgelogd. Log opnieuw in met DigiD om je gegevens op te halen.</p>'
        },
        'errorProofNotPossible': {
            'pageHeader': 'We kunnen geen bewijs maken',
            'pageIntro': '<p>Op dit moment kunnen we geen bewijs maken. Dit kan verschillende oorzaken hebben. Kijk voor meer informatie op de <a href="https://coronacheck.nl/wegwijzer" target="_blank" rel="noopener noreferrer">Wegwijzer</a>.</p>'
        },
        'errorTimeout': {
            'pageHeader': 'Sorry, er gaat iets mis',
            'pageIntro': '<p>Het is niet gelukt de server te bereiken.</p>' +
                '<p><strong>Foutcode</strong><br>%{error}</p>' +
                '<p><a href="https://status.coronacheck.nl/">Bekijk de actuele storingen</a></p>'
        }
    },
    'components': {
        'proofRegion': {
            'domestic': {
                'title': 'Nederlands bewijs',
                'intro': 'Gebruik dit bewijs voor toegang tot plekken en activiteiten binnen Nederland.',
                'paperTitle': 'Bewijs voor in Nederland'
            },
            'european': {
                'title': 'Internationaal bewijs',
                'intro': 'Gebruik dit bewijs als je in het buitenland bent of de grens over gaat.',
                'paperTitle': 'Internationaal bewijs'
            },
            'viewPDF': 'Bekijk PDF',
            'downloadPDF': 'Download PDF'
        },
        'languagePicker': {
            'language': 'Taal',
            'changeLanguage': 'Wissel van taal',
            'currentLanguage': 'Huidige taal'
        },
        'faq': {
            'viewFaq': 'Bekijk de meestgestelde vragen'
        },
        'preferMobile': {
            'header': 'Liever je bewijs op je mobiel?',
            'intro': 'Download dan de app. Ook van een bewijs in de app kun je een print maken.'
        },
        'eventInfo': {
            'head': 'Wat is er opgehaald?',
            'name': 'Naam',
            'dateOfBirth': 'Geboortedatum',
            'dateOfTest': 'Testdatum',
            'testResult': 'Testuitslag',
            'validFrom': 'Geldig vanaf',
            'validUntil': 'Geldig tot',
            'eventsFetchedAt': 'Gegevens opgehaald bij'
        },
        'test': {
            'resultNegative': 'Negatieve testuitslag',
            'yourCredentials': 'Jouw gegevens',
            'info': {
                'detailsRetrieved': 'De volgende gegevens zijn opgehaald bij de testlocatie',
                'testType': 'Type test',
                'testName': 'Testnaam',
                'testResultNegative': 'negatief (geen corona)',
                'testResultPositive': 'positief (corona)',
                'testLocation': 'Testlocatie',
                'testManufacturer': 'Testproducent',
                'testCountry': 'Getest in',
                'identificationCode': 'Uniek testnummer'
            }
        },
        'vaccination': {
            'vaccination': 'Vaccinatie',
            'info': {
                'detailsRetrieved': 'Deze gegevens van je vaccinatie zijn opgehaald bij %{provider}',
                'pathogen': 'Ziekteverwekker',
                'vaccine': 'Vaccin',
                'vaccineType': 'Vaccin type',
                'manufacturer': 'Producent van het vaccin',
                'doses': 'Doses',
                'finalDosis': 'Is dit de laatste dosis van je vaccinatie?',
                'vaccinationDate': 'Vaccinatiedatum',
                'vaccinationCountry': 'Gevaccineerd in',
                'identificationCode': 'Uniek vaccinatienummer',
                'finalDosisValue': {
                    'yes': 'Ja',
                    'recovery': 'Ja (eerder corona gehad)',
                    'prior': 'Ja (ergens anders gevaccineerd)',
                    'no': 'Nee',
                    'unknown': 'Niet bekend'
                }
            }
        },
        'recovery': {
            'title': 'Herstelbewijs',
            'info': {
                'detailsRetrieved': 'De volgende gegevens zijn opgehaald'
            }
        },
        'positiveTest': {
            'title': 'Positieve testuitslag',
            'info': {
                'detailsRetrieved': 'De volgende gegevens zijn opgehaald'
            }
        },
        'digid': {
            'loginDigid': 'Log in met DigiD',
            'dontHaveDigid': 'Ik heb geen DigiD',
            'proofType': {
                'negativetest': 'testuitslag',
                'vaccination': 'vaccinatie(s)',
                'positivetest': 'testuitslag',
                'positivetest,recovery': 'testuitslag'
            }
        }
    },
    'message': {
        'info': {
            'somethingWrong': {
                'vaccination': {
                    'head': 'Er klopt iets niet',
                    'body': '<p>Kloppen er gegevens niet? Neem dan contact op met de zorgverlener waar je bent gevaccineerd. Zij kunnen je gegevens aanpassen.</p>'
                },
                'negativetest': {
                    'head': 'Er klopt iets niet',
                    'body': '<p>Kloppen er gegevens niet? Neem contact op met je testlocatie. Zij kunnen de gegevens aanpassen.</p>'
                },
                'positivetest': {
                    'head': 'Er klopt iets niet',
                    'body': '<p>Kloppen er gegevens niet? Neem contact op met je testlocatie. Zij kunnen de gegevens aanpassen.</p>'
                }
            },
            'noVerificationCode': {
                'head': 'Nieuwe verificatiecode nodig?',
                'body': '<p>Je krijgt de verificatiecode via een sms of e-mail van de testlocatie. Niet gekregen? Dan kunnen we een nieuwe code sturen.</p>'
            },
            'didNotGetTestedYet': {
                'head': 'Ik ben nog niet getest',
                'body': '<p>Voor een testbewijs moet je eerst een test doen. Blijkt uit de test dat je geen corona hebt? Dan kan je jouw QR-code maken.</p>' +
                    '<p><a href="https://coronacheck.nl/nl/testafspraak-in-app" class="btn" target="_blank" rel="noopener noreferrer">Maak een afspraak</a></p>'
            },
            'areYouSureToCancel': {
                'head': 'Weet je zeker dat je wilt stoppen?',
                'body': 'Je moet dan later opnieuw je gegevens ophalen.',
                'yes': 'Ja, stop',
                'no': 'Nee, ga door'
            },
            'digidCanceled': {
                'head': 'Inloggen geannuleerd',
                'body': 'Wil je jouw %{type} ophalen? Log dan opnieuw in met DigiD.',
                'vaccination': 'vaccinatiegegevens',
                'negativetest': 'testuitslag',
                'positivetest': 'testuitslag'
            },
            'digidFinished': {
                'body': 'We halen nu jouw %{type} op. Je wordt automatisch uitgelogd bij DigiD'
            },
            'sessionEnded': {
                'head': 'Je sessie is gestopt',
                'body': 'Voor de veiligheid stopt je sessie automatisch na 24 uur.'
            }
        },
        'error': {
            'general': {
                'head': 'Sorry, er gaat iets mis',
                'body': '<p>Neem contact op met de helpdesk van CoronaCheck.</p>'
            },
            'noInternet': {
                'head': 'Je hebt geen internet',
                'body': 'Controleer je verbinding en probeer het opnieuw.'
            },
            // this one doesnt need a variable %{type} (as errorNoEvents has), since the other event types only
            // query 1 event provider, the combination: and events and errors is impossible
            'collectEventsWithErrors': {
                'head': 'Zijn dit al je vaccinaties?',
                'body': '<p>Door een storing of drukte zijn mogelijk niet al jouw gegevens opgehaald. Mist er een vaccinatie? Kom later terug en haal opnieuw je gegevens op.</p>'
            }
        }
    },
    'pdf': {
        'metadata': {
            'title': 'Coronabewijs met QR-code',
            'author': 'CoronaCheck'
        }
    },
    'certificate': {
        'domestic': 'Nederland',
        'european': 'Internationaal'
    },
    'and': 'En',
    'back': 'Terug',
    'close': 'Sluiten',
    'details': 'Details',
    'faq': 'Meestgestelde vragen',
    'forInstanceAbbr': 'Bijv.',
    'goBackToStart': 'Naar Home',
    'goToOverview': 'Terug naar overzicht',
    'header-appstore': 'Download in de App Store',
    'header-googleplaystore': 'Ontdek het op Google Play',
    'identity_image_alt': 'Holder QR maken',
    'logo-government': 'Logo Rijksoverheid, homepage',
    'next': 'Volgende',
    'of': 'van',
    'pageTitle': 'CoronaCheck Print Portaal',
    'skiplink': 'Ga direct naar inhoud',
    'somethingIsWrong': 'Klopt er iets niet?',
    'tryAgain': 'Probeer opnieuw',
    'unknown': 'Onbekend',
    'tooBusy': 'Het is erg druk op dit moment. Daardoor kun je niet inloggen. Wil je het op een later moment nog eens proberen?'
}

export default nl;
