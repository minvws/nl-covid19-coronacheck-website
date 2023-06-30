---
layout: in-app-content
lang: en
title: Guidepost
redirect_from: 
    - /guidepost
    - /en/wegwijzer
---

{% capture copy_intro %}
<div markdown="1">
CoronaCheck is already used by many people for creating a vaccination, recovery or test certificate. Yet there are also people experiencing problems creating their coronavirus certificate. Are you unable to make a certificate with CoronaCheck? Read what to do here.
</div>
{% endcapture %}


{% capture copy_vaccinatiebewijs %}
<div markdown="1">
At this moment, vaccination certificates are not in use within the Netherlands. Therefore you can currently use CoronaCheck only to create a vaccination certificate for international use.

You get an international vaccination certificate already after only one vaccination. This certificate in general is valid for 270 days after the completion of full vaccination. Please note: the QR codes of all your vaccinations always remain visible in the CoronaCheck-app, even after the 270 days. This is done because it varies by country how long a vaccination is valid and of which vaccination you have to show the QR code. Once you’ve received a new (booster)vaccination, you can add it yourself by logging in again with DigiD. A decision about the validity of booster vaccinations has not been made yet. For children up to 18 years old, a full vaccination certificate is valid indefinitely. This does not require a booster vaccination. Please note: the validity of a certificate made after one vaccination depends on the rules of the country you’re visiting. Check {{ site.data.links.wijsopreis[page.lang] }} to see which rules apply at your destination.

CoronaCheck retrieves data about vaccinations from the systems of the RIVM, the GGD and hospitals. Other vaccination providers, such as general practitioners and other healthcare providers, have passed on your vaccination details to the RIVM. They only do so if you have given permission. Vaccination details can be retrieved in the app. [Read here how to retrieve your vaccination data](/en/faq/1-1-hoe-werkt-de-coronacheck-app/).

More information on vaccination certificates can be found on {{ site.data.links.vaccinatiebewijs[page.lang] }}.
</div>
{% endcapture %}

{% capture copy_geen_derde_prik %}
<div markdown="1">

You have to retrieve your vaccination details for your third vaccination yourself by logging in again with DigiD. Is your third vaccination not listed? Then please contact the healthcare provider who vaccinated you. If you were vaccinated at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have your details checked. Were you vaccinated by your general practitioner, hospital or healthcare institution? Then please contact them.

</div>
{% endcapture %}


{% capture copy_geen_vaccinatiegegevens %}
<div markdown="1">
It can take up to 72 hours before your vaccination details are available. Still no data found after 72 hours? Then the vaccination data may not have been registered properly.

Your vaccination details are searched via DigiD based on the personal details that are in your passport; social security number, name and date of birth. Your vaccination must contain exactly the same information. If this does not match completely, such as a colon, a ç or an é, the data cannot be found. There are also people with an unknown date of birth in DigiD; then it says 00 or xx as the date of birth.

If no vaccination data can be found, contact the healthcare provider who vaccinated you. If you have been vaccinated at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data checked. Have you been vaccinated by your general practitioner, hospital or healthcare institution? Then contact them. They can get you a coronavirus pass with the correct data.
</div>
{% endcapture %}


{% capture copy_incorrecte_vaccinatiegegevens %}
<div markdown="1">
Are your vaccination details incorrect?
Then contact the healthcare provider who vaccinated you. If you have been vaccinated at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the details corrected.

Have you been vaccinated by your general practitioner, hospital or healthcare institution? Then contact them. They can get you a coronavirus pass with the correct data.
</div>
{% endcapture %}

{% capture copy_app_kan_geen_bewijs_maken %}
<div markdown="1"> 
Are details about your vaccination found, but does CoronaCheck say no certificate can be made?

This can be the case if there is an error in your vaccination data, for example if the vaccination date or the type of the vaccine is incorrect. Then no link can be made and CoronaCheck cannot make a vaccination certificate.

Then contact the healthcare provider who vaccinated you. If you have been vaccinated at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected.

Have you been vaccinated by your general practitioner, hospital or healthcare institution? Then contact them. They can get you a coronavirus pass with the correct data.
</div>
{% endcapture %}


{% capture copy_in_buitenland_gevaccineerd %}
<div markdown="1">
See {{ site.data.links.buitenlandvaccinatie[page.lang] }}. There you’ll always find the latest information.
</div>
{% endcapture %}


{% capture copy_herstelbewijs %}
<div markdown="1">
A recovery certificate is proof that you have ever been tested positive for the presence of the Sars-Cov2-virus by the GGD.

At this moment, recovery certificates are not in use within the Netherlands. Therefore you can currently use CoronaCheck only to create a recovery certificate for international use. A number of rules apply:

The recovery certificate is valid from 11 days after the positive test result, but the recovery certificate may be created earlier. In the case of a recovery certificate, the positive test result may be a maximum of 180 days old.

CoronaCheck retrieves positive test results from the GGD. Both test results from the GGD itself and test results from other testing locations can be retrieved. These results must have been passed on to the GGD.

More information about recovery certificates can be found on {{ site.data.links.herstelbewijs[page.lang] }}.
</div>
{% endcapture %}

{% capture copy_mijn_test_telt_mee %}
<div markdown="1">
If you’ve had coronavirus, in some cases your positive test can count for your vaccination certificate. You then need one less jab for a full certificate, because your positive test can count as a vaccination. Your positive test result can only count for your vaccination certificate if you:

- were tested positive before your first vaccination
- were less than 12 years old when you tested positive
</div>
{% endcapture %}


{% capture copy_geen_herstelbewijs_gegevens %}
<div markdown="1">
This can have several causes:

- You have just been tested. It can take a few hours for your positive test result to be available. 
- You have been tested (positive) more than 180 days ago. In this case you are not entitled to a recovery certificate.

Do none of the above situations apply, and have you been tested positive? Then contact your test provider.  If you were tested at the GGD, please contact them on {{ site.data.links.phone-ggd[page.lang] }} or go to {{ site.data.links.herstelbewijs-elders[page.lang] }} and fill in the form if you were tested at another test provider.
</div>
{% endcapture %}

{% capture copy_incorrecte_herstelgegevens %}
<div markdown="1">  
Are the details retrieved from your positive test result incorrect (your type of test, time or date for example)? If you have been tested at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected. If you have been tested at another test provider, please go to {{ site.data.links.herstelbewijs-elders[page.lang] }} and fill in the form.
</div>
{% endcapture %}

{% capture copy_we_kunnen_geen_herstelbewijs_maken %}
<div markdown="1"> 
Are details about your vaccination found, but does CoronaCheck say no certificate can be made? Your test result may be more than 180 days old. Then it is no longer possible to make a recovery certificate.

Were you tested less than 180 days ago? Then there may be an error in the test data.  If you have been tested at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected. If you have been tested at another test provider, please go to {{ site.data.links.herstelbewijs-elders[page.lang] }} and fill in the form.
</div>
{% endcapture %}
 
{% capture copy_testbewijs %}
<div markdown="1">
Only test results from test locations that are affiliated with CoronaCheck can be converted into a coronavirus pass. More information about test certificates can be found on {{ site.data.links.testenvoorjereis[page.lang] }}.

### Tested negative at the GGD
It can take up to 30 hours before the results of a test are available. From the moment the GGD has the results (you can see this via {{ site.data.links.coronatest[page.lang] }}) it will take a few hours before the data can be retrieved through CoronaCheck. Is your test result already available in {{ site.data.links.coronatest[page.lang] }}, but not in the CoronaCheck app 30 hours after taking the test? Please contact the GGD on {{ site.data.links.phone-ggd[page.lang] }}.

{% if site.version != "0g" %}
### Testing for access
Do you want to use a coronavirus pass for access to events and locations within the Netherlands? Contact {{ site.data.links.testen-voor-toegang[page.lang] }} ({{ site.data.links.phone-tvt-helpdesk[page.lang] }}). There you will get all relevant information and you can make an appointment. When you’re visiting an event or location that requires a test certificate, the organization usually provides you with the information for example on the ticket, in a confirmation email or on the website.
{% endif %}
</div>
{% endcapture %}

{% capture copy_testen_voor_je_reis %}
<div markdown="1">
Do you want to use a coronavirus pass to travel within Europe? You can visit {{ site.data.links.testenvoorjereis[page.lang] }}. Please note: each country determines its own entry rules. So always check {{ site.data.links.wijsopreis[page.lang] }} before departure to avoid unpleasant surprises.
</div>
{% endcapture %}

{% capture copy_geen_ophaalcode %}
<div markdown="1">
This retrieval code consists of a long string of letters and numbers (eg BRB-YYYYYYYYYY-Z2). You will receive this from the test location. You will receive the result of an antigen test within three hours, the result of a PCR test can take up to 24 hours. 

Sometimes it can take a little longer. Didn’t receive your result? It can be for several reasons:

- Your test has yet to be processed.
- Your email address is incorrect or the email may have ended up in your spam box.
- There is a problem at the test site in reporting the results. Please contact the location where you have been tested.

Please contact the location where you have been tested. {% if site.version != "0g" %}
Have you been tested via <span lang="nl">Testen voor Toegang</span>? Contact their help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
{% endif %}
</div>
{% endcapture %}

{% capture copy_geen_verificatiecode %}
<div markdown="1">
The verification code (by SMS or email) should normally arrive within a minute of entering the retrieval code. Didn’t receive a verification code? It can be for several reasons:

- In case your provider sends the verification code by email, please also check your spam folder.
- Did you perhaps provide a foreign telephone number? It happens sporadically that SMS messages to foreign numbers do not get through.

Please contact the location where you have been tested. 
{% if site.version != "0g" %}
Have you been tested via <span lang="nl">Testen voor Toegang</span>? Contact their help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
{% endif %}
</div>
{% endcapture %}


{% capture copy_incorrecte_testgegevens %}
<div markdown="1"> 
Please contact the location where you have been tested to your data corrected.

If you have been tested at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }}.

{% if site.version != "0g" %}
Have you been tested via <span lang="nl">Testen voor Toegang</span>? Contact their help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
{% endif %}
</div>
{% endcapture %}

{% capture copy_we_kunnen_geen_testbewijs_maken %}
<div markdown="1"> 
Does the app say no certificate can be made? There may be something wrong with the details from your test result. Contact the healthcare provider where you were tested. They can check and correct your details.

If you have been tested at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected.

{% if site.version != "0g" %}
Have you been tested via <span lang="nl">Testen voor Toegang</span>? Contact their help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
{% endif %}

</div>
{% endcapture %}


{% capture copy_printbewijs %}
<div markdown="1">
No smartphone? Rather have a paper coronavirus pass or do you want to make a coronavirus pass for your children? You can make a paper coronavirus pass at [www.coronacheck.nl/en/print](/en/print). Also if you want to make a paper coronavirus pass in addition to your CoronaCheck app.
</div>
{% endcapture %}

{% capture copy_bezoekersbewijs %}
<div markdown="1">
Were you vaccinated outside of the European Union and are you visiting the Netherlands? Then you can use your vaccination approval and negative test result to create a visitor pass. You can use your visitor pass to get access to places and activities in the Netherlands that require a coronavirus pass.

For more information, please visit {{ site.data.links.entry-pass[page.lang] }}.
</div>
{% endcapture %}

{% capture copy_bezoek_ophalen_vaccinatiebeoordeling %}
<div markdown="1">
Do you get an error code when filling in the vaccination approval code? Or are you not receiving a verification code? Please go back to the desk that reviewed your vaccination.
</div>
{% endcapture %}

{% capture copy_bezoek_ophalen_negatieve_test %}
<div markdown="1">
Do you get an errorcode when filling in the retrieval code after your negative test? Or are you not receiving a verification code? Please contact the Testen voor Toegang help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
</div>
{% endcapture %}

{% capture copy_bezoek_persoonsgegevens_verschillen %}
<div markdown="1">
If the personal details on your vaccination approval and your negative test result do not match, CoronaCheck can not create a visitor pass. Please check which of the personal details are incorrect, and have those changed. Are the details on your vaccination review incorrect? Then go back to the desk that reviews your vaccination. Are the details on your negative test result incorrect? Then contact the Testen voor Toegang help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
</div>
{% endcapture %}


{% capture copy_digid %}
<div markdown="1">

### I don't have a DigiD

To retrieve your vaccination details in CoronaCheck, you need a valid DigiD. <a href="https://www.digid.nl/en/apply-or-activate-digid" rel="noopener noreferrer" target="_blank">You can request it via this link</a>.  A request for a new DigiD takes a couple of working days to process.

You can log in with DigiD via the app (<a href="https://www.digid.nl/en/login-methods/digid-app" rel="noopener noreferrer" target="_blank">Download the DigiD app here</a>) or via the DigiD website, using SMS verification. <a href="https://www.digid.nl/en/login-methods/sms-verification" rel="noopener noreferrer" target="_blank">Read more about setting up SMS verification here</a>.

Do you need more information about DigiD? Contact the help desk on {{ site.data.links.phone-digid-helpdesk[page.lang] }} (reachable on working days from 8 a.m. to 10 p.m. and during weekends, between 12 p.m. and 10 p.m.).

If you don’t have a DigiD or no digital means, please call the CoronaCheck Helpdesk.

### Error message DigiD / technical outages

For some people it is not possible to log in with DigiD. One of the following solutions might work for you:

- Close all open DigiD browsers manually (*.coronacheck.nl, *.overheid.nl en *.digid.nl)), close the CoronaCheck app and then try to log in again via CoronaCheck;
- Update the CoronaCheck-app and the DigiD-app (when in use) to the latest version;
- Sometimes it is necessary to manually delete your browser cache and cookies and then log in again via CoronaCheck;
- In some cases, switching your internet connection works. For example, turn Wi-Fi off and on and then try again;
- Use a supported browser, like Mozilla Firefox, Google Chrome or Microsoft Edge and set this as default;
- Check whether you accept cookies. After retrieving the data you can disable this again;
- Sometimes it works to restart the phone and then try again;
- Finally, it may work to use DigiD on another device.

**Please note:** Are you using iOS15, and did you receive the error message that ‘There was no activity on the screen for more than 15 minutes?’  Set another browser as default (not Safari) and try again.'

Still not working? Please contact the help desk on {{ site.data.links.phone-helpdesk[page.lang] }} or via [helpdesk@coronacheck.nl](mailto:helpdesk@coronacheck.nl).

### I don't have a social security number 

All information about getting a vaccination certificate if you do not have a BSN number can be found on {{ site.data.links.coronabewijs-hulp[page.lang] }}.

</div>
{% endcapture %}

{% capture copy_travelquestions %}
<div markdown="1">
Are you going on a trip soon? Before departure, always check the applicable entry rules for your destination at {{ site.data.links.wijsopreis[page.lang] }}. Read more about a coronatest for travellers here: {{ site.data.links.testenvoorjereis[page.lang] }}.

For other questions, you can <a href="https://www.netherlandsworldwide.nl/contact/contacting-the-24-7-bz-contact-centre" rel="noopener noreferrer" target="_blank">contact Netherlands Worldwide</a> - available 24 hours a day, 7 days a week.
</div>
{% endcapture %}

{% capture copy_positieve_test_laten_meetellen %}
<div markdown="1">
If you’ve had coronavirus, in some cases you can have a positive test count for your vaccination certificate. You then need one less jab for a full certificate, because your positive test can count as a vaccination. Your positive test result can only count for your vaccination certificate if you:

- were tested positive before your first vaccination
- were less than 12 years old when you tested positive

If you create your vaccination certificate using CoronaCheck, you may also choose to retrieve your oldest positive test result. If your test result meets any of the conditions above, it will automatically count for your vaccination certificate. 

If the right test result cannot be found, please contact the healthcare provider that vaccinated you. They can help you get a full vaccination certificate that includes your test.
</div>
{% endcapture %}

{% capture copy_positive_before_vacc %}
<div markdown="1">
Were you tested positive, and did you receive your first vaccination after? Then you are fully vaccinated. You will receive a full vaccination certificate if your retrieved positive test result is from before your first vaccination.

From version 2.6.0 of the CoronaCheck app onwards, you’ll have the option to retrieve a positive test result after only one vaccination is found while retrieving your vaccination details. At this moment, you can only retrieve your most recent positive test result.

Were you tested positive more than once, with the first time happening before your first vaccination, but can only the result from a test that happened after be found? Please contact the healthcare provider who vaccinated you. They can help you create a full vaccination certificate.
</div>
{% endcapture %}

{% comment %}
    Page structure ----------------------------------------------
{% endcomment %}

{% comment %}
    Vaccinatiebewijzen
{% endcomment %}

{{ copy_intro }}

<details class="details" id="vacc"><summary><h2>I want to create a vaccination certificate</h2></summary>

<h3>In general regarding vaccination certificate</h3>
{{ copy_vaccinatiebewijs }}

<details class="details" id="vacc_nothirdjab">
<summary><h3>My third vaccination cannot be found</h3></summary>
{{ copy_geen_derde_prik }}
</details>

<details class="details" id="vacc_nodata">
<summary><h3>No vaccination details found</h3></summary>
{{ copy_geen_vaccinatiegegevens }}
</details>

<details class="details" id="vacc_dataincorrect">
<summary><h3>My vaccination details are incorrect</h3></summary>
{{ copy_incorrecte_vaccinatiegegevens }}
</details>

<details class="details" id="vacc_cantmakeproof">
<summary><h3>The app can't create a certificate</h3></summary>
{{ copy_app_kan_geen_bewijs_maken }}
</details>

<details class="details" id="vacc_positive_before_vacc">
<summary><h3>I tested positive before my first vaccination</h3></summary>
{{ copy_positive_before_vacc }}
</details>

<details class="details" id="vacc_countpositivetest"><summary><h3>Having a positive test count for my vaccination certificate</h3></summary>
{{ copy_positieve_test_laten_meetellen }}
</details>

<details class="details" id="vacc_othercountry"><summary><h3>Have you been vaccinated abroad? </h3></summary>
{{ copy_in_buitenland_gevaccineerd }}
</details>

</details>

{% comment %}
    Herstelbewijzen
{% endcomment %}

<details class="details" id="recovery"><summary><h2>I want to create a recovery certificate </h2></summary>
{{ copy_herstelbewijs }}

<details class="details" id="recovery_countpositivetest">
<summary><h3>My positive test counts for my vaccination certificate</h3></summary>
{{ copy_mijn_test_telt_mee }}
</details>

<details class="details" id="recovery_nodata">
<summary><h3>No details found</h3></summary>
{{ copy_geen_herstelbewijs_gegevens }}
</details>

<details class="details" id="recovery_dataincorrect">
<summary><h3>The details found are incorrect</h3></summary>
{{ copy_incorrecte_herstelgegevens }}
</details>

<details class="details" id="recovery_cantmakeproof">
<summary><h3>The app cannot create a certificate</h3></summary>
{{ copy_we_kunnen_geen_herstelbewijs_maken }}
</details>
 
</details>

{% comment %}
    Testbewijzen
{% endcomment %}

<details class="details" id="test"><summary><h2>I want to make a test certificate</h2></summary>
    {{ copy_testbewijs }}

<h3>Testing before your trip</h3>
{{ copy_testen_voor_je_reis }}

<details class="details" id="test_nocode">
<summary><h3>I did not receive a retrieval code</h3></summary>
{{ copy_geen_ophaalcode }}
</details>

<details class="details" id="test_noverificationcode">
<summary><h3>I'm not getting a verification code via SMS or email</h3></summary>
{{ copy_geen_verificatiecode }}
</details>

<details class="details" id="test_incorrectdata">
<summary><h3>The details found are incorrect</h3></summary>
{{ copy_incorrecte_testgegevens }}
</details>

<details class="details" id="test_cantmakeproof">
<summary><h3>The app can't create a certificate</h3></summary>
{{ copy_we_kunnen_geen_testbewijs_maken }}
</details>

</details>

<details class="details" id="paper">
<summary><h2>I want to make a paper coronavirus pass</h2></summary>
{{ copy_printbewijs }}
</details>

{% if site.version == "3g" %}
<details class="details" id="visitor">
<summary><h2>I want to create a visitor pass</h2></summary>
{{ copy_bezoekersbewijs }}

<details class="details" id="visitor_cantretrieve">
<summary><h3>The vaccination approval cannot be retrieved</h3></summary>
{{ copy_bezoek_ophalen_vaccinatiebeoordeling }}
</details>

<details class="details" id="visitor_cantretrievenegativetest">
<summary><h3>The testresult can not be retrieved</h3></summary>
{{ copy_bezoek_ophalen_negatieve_test }}
</details>

<details class="details" id="visitor_dataisdifferent">
<summary><h3>The personal details on your vaccination approval and your negative test result do not match</h3></summary>
{{ copy_bezoek_persoonsgegevens_verschillen }}
</details>
</details>
{% endif %}

<details class="details" id="digid">
<summary><h2>I can’t login with DigiD</h2></summary>
{{ copy_digid }}
</details>

<details class="details" id="travel">
<summary><h2>Questions about travelling?</h2></summary>
{{ copy_travelquestions }}
</details>
