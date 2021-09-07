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
            'pageIntro': '<h2 class="screen-reader-text">Zo werkt het</h2><p>Een bewijs op papier is handig als je geen smartphone hebt. Dit is hoe het werkt:</p><div class="home__section"><h3>Alleen toegang met een bewijs</h3><p>Jouw gezondheid en die van anderen is belangrijk. Daarom vragen sommige landen of plekken om een coronabewijs. Alleen met dit bewijs krijg je toegang. Je kan een coronabewijs maken als je bent gevaccineerd, als uit een test blijkt dat je geen corona hebt of als je corona hebt gehad en bent hersteld.</p></div><div class="home__section"><h3>QR-code = jouw bewijs</h3><p>Van jouw testuitslag of vaccinatie wordt een QR-code gemaakt. Dat is jouw bewijs. De QR-code wordt gecheckt bij de ingang van plekken en activiteiten. Of aan de grens.</p></div><div class="home__section"><h3>QR-codes voor Nederland en internationaal</h3><p>Je krijgt twee QR-codes: één voor Nederland en één voor internationaal. Reis je buiten Nederland? Gebruik dan je internationale QR-code.</p></div>',
            'userConsentHeader': 'Maak een papieren bewijs',
            'userConsentText': 'Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank" rel="noopener noreferrer">privacyverklaring</a> gelezen en begrijp hoe CoronaCheck mijn gegevens gebruikt',
            'noConsentError': 'Ga eerst akkoord met de privacyverklaring'
        },
        'choiceProof': {
            'pageHeader': 'Wat voor bewijs wil je maken?',
            'pageIntro': '<p>Geef aan wat voor bewijs je wil maken.</p>',
            'choiceTestHeader': 'Een testbewijs',
            'choiceTestBody': 'Uit de test blijkt dat ik geen corona heb',
            'choiceRecoveryHeader': 'Een herstelbewijs',
            'choiceRecoveryBody': 'Uit de test blijkt dat ik corona heb gehad',
            'choiceVaccinationHeader': 'Een vaccinatiebewijs',
            'choiceVaccinationBody': 'Ik heb mijn prik of prikken gehad'
        },
        'choiceTestLocation': {
            'pageHeader': 'Waar ben je getest?',
            'pageIntro': '<p>Geef aan of je bij de GGD of bij een andere testlocatie getest bent.</p>',
            'choiceGGDHead': 'GGD',
            'choiceGGDBody': 'Login met DigiD',
            'loginDigid': 'Ik heb geen DigiD',
            'choiceOtherLocation': 'Andere testlocatie',
            'didNotGetTestedYet': 'Ik ben nog niet getest'
        },
        'collectVaccination': {
            'pageHeader': 'Vaccinatie ophalen',
            'pageIntro': '<p>Ben je al gevaccineerd? Log in met DigiD. De gegevens van je vaccinatie worden dan automatisch opgehaald.</p><p>Nog geen prik gehad? Laat je dan eerst vaccineren.</p>'
        },
        'vaccinationOverview': {
            'pageHeader': 'Jouw opgehaalde vaccinaties',
            'pageIntro': '<p>Je kan een bewijs maken van je vaccinaties.</p>',
            'createTestProofButton': 'Maak QR-code'
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
            'pageIntro': '<p>Op dit moment kunnen we geen bewijs maken. Voor een Nederlands bewijs moet je volledig gevaccineerd zijn. Een internationaal bewijs kun je vanaf 1 juli maken.<p></p>'
        },
        'collectRecovery': {
            'pageHeader': 'Gegevens van je herstel ophalen',
            'pageIntro': '<p>Heb je corona gehad? Dan kun je van de positieve testuitslag van de GGD een herstelbewijs maken. Log in met DigiD om een testuitslag op te halen.</p><p>Je herstelbewijs wordt 11 dagen na de positieve testuitslag geldig. Je moet dan ook vrij zijn van klachten.</p>'
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
            'unknownTestProvider': 'De testlocatie is ons niet bekend. Neem contact op met de locatie waar je getest bent.',
            'invalidTestCode': 'Geen geldige ophaalcode',
            'tokenExpired': 'Ophaalcode is niet meer geldig',
            'invalidVerificationCode': 'Geen geldige verificatiecode',
            'emptyVerificationCode': 'Verificatiecode niet ingevuld',
            'sendCode': 'Stuur code'
        },
        'negativeTestOverview': {
            'pageHeader': 'Controleer je testuitslag',
            'pageIntro': '<p>Deze testuitslag is opgehaald bij de testlocatie.</p><p>Kloppen de gegevens hieronder? Dan kun je van de negatieve testuitslag een QR-code maken. Dat is jouw bewijs.</p>',
            'createTestProofButton': 'Maak QR-code',
            'retrievedTestResult': 'Opgehaalde testuitslag'
        },
        'testResultPending': {
            'pageHeader': 'Testuitslag nog niet bekend',
            'pageIntro': 'Probeer het later nog eens.<br>Neem voor vragen contact op met jouw testlocatie.'
        },
        'testResultNone': {
            'pageHeader': 'Geen testuitslag beschikbaar',
            'pageIntro': '<p>Er zijn geen gegevens over je testuitslag beschikbaar. Dit kan verschillende oorzaken hebben. Kijk voor meer informatie op <a href="https://coronacheck.nl/nl/wegwijzer.html" target="_blank" rel="noopener noreferrer">de Wegwijzer</a>.</p><p>Heb je al een testuitslag van de GGD gekregen? Dan kan het nog een paar uur duren voordat je de uitslag hier kunt ophalen. Probeer het later opnieuw.</p>'
        },
        'recoveryOverview': {
            'pageHeader': 'Jouw positieve testuitslag',
            'pageIntro': '<p>Als je gegevens kloppen dan kun je een QR-code maken van je positieve testuitslag. Dat is jouw bewijs.</p>'
        },
        'recoveryNone': {
            'pageHeader': 'Geen positieve testuitslag beschikbaar',
            'pageIntro': '<p>Er is geen positieve testuitslag beschikbaar.</p><p>Ben je net getest? Het kan een paar uur duren voordat je positieve test verwerkt is. Probeer het later nog eens.</p><p>Is het langer dan %{days} dagen geleden dat je getest bent? Dan is je testuitslag niet meer geldig. Je kunt dan ook geen herstelbewijs maken.</p>'
        },
        'print': {
            'openPDF': 'Open PDF'
        },
        'printNegativeTest': {
            'both': {
                'pageHeader': 'Print jouw bewijzen',
                'pageIntro': '<h4>Jouw bewijzen</h4><p>Je hebt een testbewijs gemaakt, in de vorm van een QR-code. Je hebt een QR-code voor binnen Nederland en een QR-code voor als je internationaal reist.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Dit is wat er in de QR-codes staat</a>.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
            },
            'european': {
                'pageHeader': 'Print jouw internationale testbewijs',
                'pageIntro': '<h4>Jouw bewijs</h4><p>Je hebt een testbewijs gemaakt, in de vorm van een QR-code. Je hebt alleen een internationaal bewijs. Er is geen Nederlands bewijs gemaakt omdat het type test niet voldoet, of omdat het testbewijs al verlopen is in Nederland.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Dit is wat er in de QR-codes staat</a>.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar het land waar je heen reist.</p>'
            },
            'domestic': {
                'pageHeader': 'Print jouw Nederlandse testbewijs',
                'pageIntro': '<h4>Jouw bewijs</h4><p>Je hebt een testbewijs gemaakt, in de vorm van een QR-code. Deze is binnen Nederland geldig, maar internationaal niet.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Dit is wat er in de QR-codes staat</a>.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt.</p>'
            }
        },
        'printVaccination': {
            'both': {
                'pageHeader': 'Print jouw bewijzen',
                'pageIntro': '<h4>Jouw bewijzen</h4><p>Je hebt een vaccinatiebewijs gemaakt, in de vorm van een QR-code. Je hebt nu twee QR-codes: één voor Nederland en één internationale.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Dit is wat er in de QR-codes staat</a>.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p><p>Let op: dit papieren bewijs is 1 jaar geldig. Daarna kan je een nieuw papieren bewijs maken van je vaccinatie.</p>'
            },
            'european': {
                'pageHeader': 'Print jouw internationale vaccinatiebewijs',
                'pageIntro': '<h4>Jouw bewijs</h4><p>Je hebt een vaccinatiebewijs gemaakt, in de vorm van een QR-code. Je hebt alleen een internationaal bewijs. Dit kan komen doordat je nog maar één vaccinatie hebt gehad. Probeer opnieuw een Nederlands bewijs te maken als je volledig gevaccineerd bent.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Dit is wat er in de QR-codes staat</a>.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p><p>Let op: dit papieren bewijs is 1 jaar geldig. Daarna kan je een nieuw papieren bewijs maken van je vaccinatie.</p>'
            }
            // domestic only is a non existing scenario for vaccination
        },
        'printRecovery': {
            'both': {
                'pageHeader': 'Print jouw bewijzen',
                'pageIntro': '<h4>Jouw bewijzen</h4><p>Je hebt een herstelbewijs gemaakt, in de vorm van een QR-code. Je hebt een QR-code voor binnen Nederland en een internationale QR-code.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Dit is wat er in de QR-codes staat</a>.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
            },
            'domestic': {
                'pageHeader': 'Print jouw Nederlandse herstelbewijs',
                'pageIntro': '<h4>Jouw bewijs</h4><p>Je hebt een Nederlands herstelbewijs gemaakt, in de vorm van een QR-code. Deze is binnen Nederland geldig, maar internationaal niet.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Dit is wat er in de QR-codes staat</a>.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt.</p>'
            },
            // european only is a non existing scenario for recovery
            'validInFuture': {
                'pageIntro': '<h4>Jouw bewijzen</h4><p>Je hebt een herstelbewijs gemaakt, in de vorm van een QR-code. Je hebt een QR-code voor binnen Nederland en een internationale QR-code.</p><p>Je herstelbewijs wordt 11 dagen na de posititieve testuitslag geldig.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank" rel="noopener noreferrer">Dit is wat er in de QR-codes staat</a>.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
            }
        },
        'serverBusy': {
            'pageHeader': 'Sorry, het is erg druk',
            'pageIntro': '<p>Probeer het op een later moment nog eens.</p>'
        },
        'errorNoEvents': {
            'pageHeader': 'Sorry, het is niet gelukt',
            'pageIntro': '<p>Door drukte of een storing bij een van de partijen hebben we geen gegevens over je %{type} kunnen ophalen.</p><p>Tip: wacht een uur en probeer het dan nog een keer.</p>'
        },
        'errorTokenFlow': {
            'pageHeader': 'Sorry, er gaat iets mis',
            'pageIntro': '<p>Er gaat iets mis bij de testlocatie. Daardoor kunnen jouw gegevens niet worden opgehaald.</p><h4>Wat nu?</h4><p>Neem contact op met je testlocatie en geef de volgende foutcode door:</p><p><strong>Foutcode: %{error}</strong></p>'
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
            'pageIntro': '<p>Op dit moment kunnen we geen bewijs maken. Dit kan verschillende oorzaken hebben. Kijk voor meer informatie op <a href="https://coronacheck.nl/wegwijzer" target="_blank" rel="noopener noreferrer">de Wegwijzer</a>.</p>'
        }
    },
    'components': {
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
                'detailsRetrieved': 'De volgende gegevens zijn opgehaald bij de testlocatie'
            }
        },
        'positiveTest': {
            'title': 'Positieve testuitslag',
            'info': {
                'detailsRetrieved': 'De volgende gegevens zijn opgehaald bij de testlocatie'
            }
        },
        'digid': {
            'loginDigid': 'Login met DigiD',
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
                    'body': '<p>Kloppen je gegevens niet? Of mist er een vaccinatie? Op de <a href="https://coronacheck.nl/wegwijzer" target="_blank" rel="noopener noreferrer">Wegwijzer</a> vind je meer informatie over wat te doen.</p><p>Mist er een prik? Neem contact op met de locatie waar je bent gevaccineerd.</p>'
                },
                'negativetest': {
                    'head': 'Er klopt iets niet',
                    'body': '<p>Kloppen jouw gegevens niet met je identiteitsbewijs? Neem contact op met je testlocatie om je gegevens te laten aanpassen.</p>'
                },
                'positivetest': {
                    'head': 'Er klopt iets niet',
                    'body': '<p>Kloppen jouw gegevens niet met je identiteitsbewijs? Neem contact op met je testlocatie om je gegevens te laten aanpassen.'
                }
            },
            'noVerificationCode': {
                'head': 'Nieuwe verificatiecode nodig?',
                'body': '<p>Je krijgt de verificatiecode via een sms of e-mail van de testlocatie. Niet gekregen? Dan kunnen we een nieuwe code sturen.</p>'
            },
            'didNotGetTestedYet': {
                'head': 'Ik ben nog niet getest',
                'body': '<p>Je moet je eerst laten testen voordat je een QR-code kan maken. Als uit de test blijkt dat je geen corona hebt kan je jouw QR-code maken.</p><p>Een testbewijs is geldig tot 24 uur na het moment van testen. Plan je test dus op tijd. En zorg dat jouw QR-code binnen 24 uur gescand is bij de ingang.</p><p><a href="https://coronacheck.nl/nl/testafspraak-in-app" class="btn" target="_blank" rel="noopener noreferrer">Maak een afspraak</a></p>'
            },
            'areYouSureToCancel': {
                'head': 'Weet je zeker dat je wilt stoppen?',
                'body': 'Je moet dan later opnieuw met DigiD inloggen om je %{type} op te halen.',
                'yes': 'Ja, stop',
                'no': 'Nee, ga door'
            },
            'digidCanceled': {
                'head': 'Inloggen afgebroken',
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
    'and': 'En',
    'back': 'Terug',
    'close': 'Sluiten',
    'details': 'Details',
    'faq': 'Meestgestelde vragen',
    'forInstanceAbbr': 'Bijv.',
    'goBackToStart': 'Naar Home',
    'header-appstore': 'Download in de App Store',
    'header-googleplaystore': 'Ontdek het op Google Play',
    'identity_image_alt': 'Holder QR maken',
    'logo-government': 'Logo Rijksoverheid, homepage',
    'next': 'Volgende',
    'of': 'van',
    'skiplink': 'Ga direct naar inhoud',
    'somethingIsWrong': 'Klopt er iets niet?',
    'unknown': 'Onbekend',
    'tooBusy': 'Het is erg druk op dit moment. Daardoor kun je niet inloggen. Wil je het op een later moment nog eens proberen?'
}

export default nl;
