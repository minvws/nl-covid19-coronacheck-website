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
            'userConsentText': 'Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank">privacyverklaring</a> gelezen en begrijp hoe CoronaCheck mijn gegevens gebruikt',
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
        'VaccinationOverview': {
            'pageHeader': 'Jouw opgehaalde vaccinaties',
            'pageIntro': '<p>Je kan een bewijs maken van je vaccinaties.</p>',
            'createTestProofButton': 'Maak QR-code'
        },
        'noVaccinations': {
            'pageHeader': 'Geen vaccinatie(s) beschikbaar',
            'pageIntro': '<p>Er zijn geen gegevens over je vaccinatie beschikbaar.</p><p>Ben je kortgeleden gevaccineerd? Dan kan het even duren voordat je gegevens beschikbaar zijn.<p>Het kan zijn dat jouw huisarts niet is aangesloten op de GGD. Kijk voor meer informatie op <a href="https://coronacheck.nl/wegwijzer" target="_blank">CoronaCheck.nl/wegwijzer.</a></p>'
        },
        'notPossibleVaccinations': {
            'pageHeader': 'We kunnen geen bewijs maken',
            'pageIntro': '<p>Op dit moment kunnen we geen bewijs maken van jouw vaccinatie. Dit kan verschillende oorzaken hebben. <a href="https://coronacheck.nl/wegwijzer" target="_blank">Lees hier meer</a>.</p>'
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
            'invalidTestCode': 'Geen geldige ophaalcode',
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
        'negativeTestNotPossible': {
            'pageHeader': 'We kunnen geen bewijs maken',
            'pageIntro': '<p>Op dit moment kunnen we geen bewijs maken van jouw testuitslag. Dit kan verschillende oorzaken hebben. <a href="https://coronacheck.nl/wegwijzer" target="_blank">Lees hier meer</a>.</p>'
        },
        'testResultPending': {
            'pageHeader': 'Testuitslag nog niet bekend',
            'pageIntro': 'Probeer het later nog eens.<br>Neem voor vragen contact op met jouw testlocatie.'
        },
        'testResultNone': {
            'pageHeader': 'Geen negatieve testuitslag',
            'pageIntro': 'Er is geen negatieve testuitslag beschikbaar.'
        },
        'recoveryOverview': {
            'pageHeader': 'Jouw positieve testuitslag',
            'pageIntro': '<p>Als je gegevens kloppen dan kun je een QR-code maken van je positieve testuitslag. Dat is jouw bewijs.</p>'
        },
        'recoveryNone': {
            'pageHeader': 'Geen positieve testuitslag beschikbaar',
            'pageIntro': '<p>Er is geen positieve testuitslag beschikbaar.</p><p>Ben je net getest? Het kan een paar uur duren voordat je positieve test verwerkt is. Probeer het later nog eens.</p><p>Is het langer dan %{days} dagen geleden dat je getest bent? Dan is je testuitslag niet meer geldig. Je kunt dan ook geen herstelbewijs maken.</p>'
        },
        'recoveryNotPossible': {
            'pageHeader': 'We kunnen geen bewijs maken',
            'pageIntro': 'Op dit moment kunnen we geen bewijs maken van jouw positieve test. Dit kan verschillende oorzaken hebben. Lees <a href="https://coronacheck.nl/nl/wegwijzer.html" target="_blank">hier</a> meer.'
        },
        'print': {
            'openPDF': 'Open PDF'
        },
        'printNegativeTest': {
            'both': {
                'pageHeader': 'Print jouw bewijzen',
                'pageIntro': '<p><strong>Jouw bewijzen</strong><br>Je hebt een testbewijs gemaakt, in de vorm van een QR-code. Je hebt een QR-code voor binnen Nederland en een QR-code voor als je internationaal reist.</p><p><strong>Informatie in de QR</strong><br><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><p><strong>En nu?</strong><br>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
            },
            'domestic': {
                'pageHeader': 'Print jouw Nederlandse testbewijs',
                'pageIntro': '<p><strong>Jouw bewijs</strong><br>Je hebt een Nederlands testbewijs gemaakt, in de vorm van een QR-code. Deze is geldig binnen Nederland, maar niet in andere landen.</p><p><strong>Informatie in de QR</strong><br><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><p><strong>En nu?</strong><br>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt.</p>'
            },
            'european': {
                'pageHeader': 'Print jouw internationale testbewijs',
                'pageIntro': '<p><strong>Jouw bewijs</strong><br>Je hebt een testbewijs gemaakt, in de vorm van een QR-code. Je hebt alleen een internationaal bewijs. Er is geen Nederlands bewijs gemaakt omdat het type test niet voldoet, of omdat het testbewijs al verlopen is in Nederland.</p><p><strong>Informatie in de QR</strong><br><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><p><strong>En nu?</strong><br>Print de PDF en neem het printje mee naar het land waar je heen reist.</p>'
            }
        },
        'printVaccination': {
            'both': {
                'pageHeader': 'Print jouw bewijzen',
                'pageIntro': '<p><strong>Jouw bewijzen</strong><br>Je hebt een vaccinatiebewijs gemaakt, in de vorm van een QR-code. Je hebt nu twee QR-codes: één voor Nederland en één internationale.</p><p><strong>Informatie in de QR</strong><br><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><p><strong>En nu?</strong><br>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p><p>Let op: dit papieren bewijs is 1 jaar geldig. Daarna kan je een nieuw papieren bewijs maken van je vaccinatie.</p>'
            },
            'european': {
                'pageHeader': 'Print jouw internationale vaccinatiebewijs',
                'pageIntro': '<p><strong>Jouw bewijs</strong><br>Je hebt een vaccinatiebewijs gemaakt, in de vorm van een QR-code. Je hebt alleen een internationaal bewijs. Dit kan komen doordat je nog maar één prik hebt gehad. Probeer opnieuw een Nederlands bewijs te maken als je volledig gevaccineerd bent.</p><p><strong>Informatie in de QR</strong><br><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><p><strong>En nu?</strong><br>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p><p>Let op: dit papieren bewijs is 1 jaar geldig. Daarna kan je een nieuw papieren bewijs maken van je vaccinatie.</p>'
            }
            // domestic only is a non existing scenario for vaccination
        },
        'printRecovery': {
            'both': {
                'pageHeader': 'Print jouw bewijzen',
                'pageIntro': '<h4>Jouw bewijzen</h4><p>Je hebt een herstelbewijs gemaakt, in de vorm van een QR-code. Je hebt een QR-code voor binnen Nederland en een internationale QR-code.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
            },
            // european only and domestic only is a non existing scenario for recovery
            'validInFuture': {
                'pageIntro': '<h4>Jouw bewijzen</h4><p>Je hebt een herstelbewijs gemaakt, in de vorm van een QR-code. Je hebt een QR-code voor binnen Nederland en een internationale QR-code.</p><p>Je herstelbewijs wordt 11 dagen na de posititieve testuitslag geldig.</p><h4>Informatie in de QR</h4><p><a href="https://coronacheck.nl/nl/faq/1-6-welke-informatie-staat-in-mijn-qr-code/" target="_blank">Hier</a> kun je lezen wat er in de QR-codes staat.</p><h4>En nu?</h4><p>Print de PDF en neem het printje mee naar de locatie of activiteit die je bezoekt. Of naar het land waar je heen reist.</p>'
            }
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
        'NegativeTest': {
            'resultNegative': 'Negatieve testuitslag',
            'yourCredentials': 'Jouw gegevens'
        },
        'eventInfo': {
            'head': 'Wat is er opgehaald?',
            'name': 'Naam',
            'dateOfBirth': 'Geboortedatum',
            'detailsRetrieved': 'Deze gegevens van je vaccinatie zijn opgehaald'
        },
        'vaccination': {
            'vaccination': 'Vaccinatie',

            'info': {
                'pathogen': 'Ziekteverwekker',
                'vaccine': 'Vaccin',
                'vaccineType': 'Vaccin type',
                'manufacturer': 'Producent van het vaccin',
                'doses': 'Doses',
                'finalDosis': 'Is dit de laatste dosis van je vaccinatie?',
                'vaccinationDate': 'Prikdatum',
                'vaccinationCountry': 'Gevaccineerd in',
                'identificationCode': 'Uniek certificaatnummer',
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
            'title': 'Herstelbewijs'
        },
        'positiveTest': {
            'title': 'Positieve testuitslag'
        },
        'proofEvent': {
            'name': 'Naam',
            'dateOfTest': 'Testdatum',
            'dateOfBirth': 'Geboortedatum'
        },
        'digid': {
            'loginDigid': 'Login met DigiD',
            'dontHaveDigid': 'Ik heb geen DigiD',
            'proofType': {
                'negativetest': 'testuitslag',
                'vaccination': 'vaccinaties',
                'positivetest': 'testuitslag'
            }
        }
    },
    'message': {
        'info': {
            'somethingWrong': {
                'vaccination': {
                    'head': 'Er klopt iets niet',
                    'body': '<p>Kloppen je gegevens niet? Of mist er een vaccinatie? Kijk op <a href="https://coronacheck.nl/wegwijzer" target="_blank">CoronaCheck.nl/wegwijzer</a>.</p><p>Mist er een prik? Neem contact op met de locatie waar je bent gevaccineerd.</p>'
                },
                'negativetest': {
                    'head': 'Er klopt iets niet',
                    'body': '<p>Kloppen jouw gegevens niet met je identiteitsbewijs? Neem contact op met je testlocatie om je  gegevens te laten aanpassen.</p>'
                },
                'positivetest': {
                    'head': 'Er klopt iets niet',
                    'body': '<p>Kloppen jouw gegevens niet met je identiteitsbewijs? Neem contact op met je testlocatie om je  gegevens te laten aanpassen.'
                }
            },
            'noVerificationCode': {
                'head': 'Nieuwe verificatiecode nodig?',
                'body': '<p>Je krijgt de verificatiecode via een sms of e-mail van de testlocatie. Niet gekregen? Dan kunnen we een nieuwe code sturen.</p>'
            },
            'didNotGetTestedYet': {
                'head': 'Ik ben nog niet getest',
                'body': '<p>Je moet je eerst laten testen voordat je een QR-code kan maken. Als uit de test blijkt dat je geen corona hebt kan je jouw QR-code maken.</p><p>Een testbewijs is geldig tot 24 uur na het moment van testen. Plan je test dus op tijd. En zorg dat jouw QR-code binnen 24 uur gescand is bij de ingang.</p><p><a href="https://coronacheck.nl/nl/testafspraak-in-app" class="btn" target="_blank">Maak een afspraak</a></p>'
            },
            'areYouSureToCancel': {
                'head': 'Weet je zeker dat je wilt stoppen?',
                'body': 'Je moet dan later opnieuw met DigiD inloggen om je %{type} op te halen.',
                'yes': 'Ja, stop',
                'no': 'Nee, ga door'
            },
            'digidCanceled': {
                'head': 'Inloggen is niet gelukt',
                'body': 'Je kunt opnieuw inloggen om je %{type} op te halen.',
                'vaccination': 'vaccinaties',
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
            'expiredTestCode': {
                'head': 'De ophaalcode is verlopen',
                'body': '<p>De code die je invult is niet meer geldig. Controleer of je de juiste code hebt ingevuld. Nieuwe code nodig? Laat je dan opnieuw testen.</p>'
            },
            'general': {
                'head': 'Sorry, er gaat iets mis',
                'body': '<p>Neem contact op met de helpdesk van CoronaCheck.</p>'
            },
            'generalWithError': {
                'head': 'Sorry, er is een storing',
                'body': '<p>Neem contact op met de helpdesk van CoronaCheck en geef de foutcode (%{code}) door. Of probeer het later opnieuw.</p>'
            },
            'serverBusy': {
                'head': '',
                'body': '<p>Het is erg druk, probeer het later op de dag nog eens</p>'
            },
            'someServerBusyButResult': {
                'head': '',
                'body': '<p>Gegevens mogelijk niet compleet. Door drukte of een storing bij een van de partijen kunnen er gegevens ontbreken. Probeer het eventueel later nog een keer.</p>'
            },
            'someServerBusyNoResult': {
                'head': 'Sorry, het is erg druk',
                'body': '<p>Je vaccinaties konden niet worden opgehaald omdat het te druk is. Probeer het op een later moment nog eens.</p>'
            },
            'someServerErrorButResult': {
                'head': '',
                'body': '<p>Mogelijk zijn niet alle vaccinaties opgehaald omdat er iets fout ging bij bepaalde providers. Indien je vaccinaties mist, probeer het dan nog eens.</p>'
            },
            'someServerErrorNoResult': {
                'head': '',
                'body': '<p>Je vaccinaties konden niet worden opgehaald omdat er iets fout ging bij bepaalde providers. Probeer het nog eens</p>'
            },
            'parseErrorInResult': {
                'head': '',
                'body': '<p>Er ging iets mis, resultaat kon niet worden gelezen. Neem contact op met je event provider. (Code: x)</p>'
            },
            'noInternet': {
                'head': 'Je hebt geen internet',
                'body': 'Controleer je verbinding en probeer het opnieuw.'
            },
            'signerFailed': {
                'head': 'Sorry er gaat iets mis',
                'body': 'Neem contact op met de helpdesk van CoronaCheck en geef de foutcode (print sign error) door'
            }
        }
    },
    'pdf': {
        'metadata': {
            'title': 'Coronabewijs met QR-code',
            'author': 'CoronaCheck'
        }
    },
    'back': 'Terug',
    'close': 'Sluiten',
    'faq': 'Meestgestelde vragen',
    'forInstanceAbbr': 'Bijv.',
    'goBackToStart': 'Naar home',
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
