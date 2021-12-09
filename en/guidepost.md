---
layout: content
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

CoronaCheck retrieves data about vaccinations from the systems of the RIVM and the GGD. Other vaccination setters, such as hospitals, general practitioners and other healthcare providers, have passed on your vaccination details to the RIVM. They only do so if you have given permission. Vaccination details can be retrieved in the app. [Read here how to retrieve your vaccination data](/en/faq/1-1-hoe-werkt-de-coronacheck-app/).

You must be fully vaccinated to make a Dutch QR code. You are fully vaccinated from 14 days after the last vaccination. Or 28 days after you were vaccinated with Janssen. As soon as your vaccination has been properly registered, you can make a vaccination certificate. An international QR code can already be created after one vaccination.

**Please note:** a QR code of 1 injection is not valid in all countries. Always check the travel advice on {{ site.data.links.wijsopreis[page.lang] }} before departure. More information about vaccination certificates can be found on {{ site.data.links.vaccinatiebewijs[page.lang] }}.

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

Does that take too long? Then you can always book a free test appointment so that you can make a test certificate. For example, if you are going to visit an event within a few days. To get access to an event: {{ site.data.links.testen-voor-toegang[page.lang] }}.
</div>
{% endcapture %}


{% capture copy_incorrecte_vaccinatiegegevens %}
<div markdown="1">

Are your vaccination details incorrect?
Then contact the healthcare provider who vaccinated you. If you have been vaccinated at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the details corrected.

Have you been vaccinated by your general practitioner, hospital or healthcare institution? Then contact them. They can get you a coronavirus pass with the correct data.

Does that take too long? Then you can always book a free test appointment so that you can make a test certificate. For example, if you are going to visit an event within a few days. To get access to an event: {{ site.data.links.testen-voor-toegang[page.lang] }}.
</div>
{% endcapture %}

{% capture copy_app_kan_geen_bewijs_maken %}
<div markdown="1"> 
Are details about your vaccination found, but does CoronaCheck say no certificate can be made?

This can be the case if there is an error in your vaccination data, for example if the vaccination date or the type of the vaccine is incorrect. Then no link can be made and CoronaCheck cannot make a vaccination certificate.

Then contact the healthcare provider who vaccinated you. If you have been vaccinated at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected.

Have you been vaccinated by your general practitioner, hospital or healthcare institution? Then contact them. They can get you a coronavirus pass with the correct data.

Does that take too long? Then you can always book a free test appointment so that you can make a test certificate. For example, if you are going to visit an event within a few days. To get access to an event: {{ site.data.links.testen-voor-toegang[page.lang] }}.
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

**Please note:** A recovery certificate is not provided on the basis of a self-test or a serological test. It has been agreed in a European context that a recovery certificate may only be issued on the basis of a PCR test. For use within the Netherlands (for example for access to events), a recovery certificate is also issued based on an antigen test.

CoronaCheck retrieves positive test results from the GGD. Both test results from the GGD itself and test results from other testing locations can be retrieved. These results must have been passed on to the GGD.

More information about recovery certificates can be found on {{ site.data.links.herstelbewijs[page.lang] }}.

</div>
{% endcapture %}

{% capture copy_geen_herstelbewijs_gegevens %}
<div markdown="1">
This can have several causes:

- You have just been tested. It can take a few hours for your positive test result to be available. 
- You have been tested (positive) more than 365 days ago. In this case you are not entitled to a recovery certificate.

Do none of the above situations apply, and have you been tested positive? Then contact your test provider.  If you were tested at the GGD, please contact them on {{ site.data.links.phone-ggd[page.lang] }} or go to {{ site.data.links.herstelbewijs-elders[page.lang] }} and fill in the form if you were tested at another test provider.

If you really want to visit an event within a few days, the advice is to schedule a free test appointment so that you can make a test certificate. Make your appointment through {{ site.data.links.testen-voor-toegang[page.lang] }}.
</div>
{% endcapture %}

{% capture copy_incorrecte_herstelgegevens %}
<div markdown="1">  
Are the details retrieved from your positive test result incorrect (your type of test, time or date for example)? If you have been tested at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected. If you have been tested at another test provider, please go to {{ site.data.links.herstelbewijs-elders[page.lang] }} and fill in the form.

</div>
{% endcapture %}

{% capture copy_we_kunnen_geen_herstelbewijs_maken %}
<div markdown="1"> 
Are details about your vaccination found, but does CoronaCheck say no certificate can be made? Your test result may be more than 365 days old. Then it is no longer possible to make a recovery certificate.

Were you tested less than 365 days ago? Then there may be an error in the test data.  If you have been tested at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected. If you have been tested at another test provider, please go to {{ site.data.links.herstelbewijs-elders[page.lang] }} and fill in the form.

Does that take too long? Then you can always book a free test appointment so that you can make a test certificate. For example, if you are going to visit an event within a few days. Make your appointment through {{ site.data.links.testen-voor-toegang[page.lang] }}.

Did you add a paper recovery certificate with a validity of 180 days? In many cases, you can retrieve your recovery certificate, with a validity of 365 days, by logging in using DigiD. You can also request your new recovery certificate instead.
</div>
{% endcapture %}

{% capture copy_geen_internationaal_herstelbewijs %}
<div markdown="1"> 
It has been agreed in a European context that a recovery certificate may only be issued on the basis of a PCR test and if the test was taken no less than 11 and no more than 180 days ago. For use within the Netherlands (for example for access to events), a recovery certificate is also issued based on an antigen test and is valid until 365 days after the positive test.

### Were you tested before September 8th at a test provider other than the GGD?

For positive test results from before September 8th, 2021, the type of test is not specified. As a result, it is not clear if it has been a PCR test. Therefore, for safety reasons, all tests are treated as antigen tests. This means that we cannot create an international recovery certificate, unfortunately. 
</div>
{% endcapture %}

{% capture copy_testbewijs %}
<div markdown="1">
Only test results from test locations that are affiliated with CoronaCheck can be converted into a coronavirus pass.
More information about test certificates can be found on {{ site.data.links.testbewijs[page.lang] }}.

### Tested negative at the GGD
It can take up to 30 hours before the results of a test are available. From the moment the GGD has the results (you can see this via {{ site.data.links.coronatest[page.lang] }}) it will take a few hours before the data can be retrieved in the CoronaCheck app (or CoronaCheck website). Is your test result already available in {{ site.data.links.coronatest[page.lang] }}, but not in the CoronaCheck app 30 hours after taking the test? Please contact the GGD on {{ site.data.links.phone-ggd[page.lang] }}.

### Testing for access
Do you want to use a coronavirus pass for access to events and locations within the Netherlands? Contact {{ site.data.links.testen-voor-toegang[page.lang] }} ({{ site.data.links.phone-tvt-helpdesk[page.lang] }}). There you will get all relevant information and you can make an appointment. When you’re visiting an event or location that requires a test certificate, the organization usually provides you with the information for example on the ticket, in a confirmation email or on the website.

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
- There is a problem at the test site in reporting the results. Check Testen voor Toegang to see if there are known outages at test locations.

Contact the <span lang="nl">Testen voor Toegang</span> help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
</div>
{% endcapture %}

{% capture copy_geen_verificatiecode %}
<div markdown="1">
The verification code (by SMS or email) should normally arrive within a minute of entering the retrieval code. Didn’t receive a verification code? It can be for several reasons:

- In case your provider sends the verification code by email, please also check your spam folder.
- Did you perhaps provide a foreign telephone number? It happens sporadically that SMS messages to foreign numbers do not get through.

Contact the <span lang="nl">Testen voor Toegang</span> help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
</div>
{% endcapture %}


{% capture copy_incorrecte_testgegevens %}
<div markdown="1"> 
If you have been tested at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected.

Have you been tested via Testen voor Toegang? Contact the <span lang="nl">Testen voor Toegang</span> help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.
</div>
{% endcapture %}

{% capture copy_we_kunnen_geen_testbewijs_maken %}
<div markdown="1"> 
Does the app say no certificate can be made? There may be something wrong with the details from your test result. Contact the healthcare provider where you were tested. They can check and correct your details.

If you have been tested at the GGD, you can call their back office on {{ site.data.links.phone-ggd[page.lang] }} to have the data corrected.

Have you been tested via Testen voor Toegang? Contact the <span lang="nl">Testen voor Toegang</span> help desk on {{ site.data.links.phone-tvt-helpdesk[page.lang] }}.

</div>
{% endcapture %}


{% capture copy_printbewijs %}
<div markdown="1">
No smartphone? Rather have a paper coronavirus pass or do you want to make a coronavirus pass for your children? You can make a paper coronavirus pass at [www.coronacheck.nl/en/print](/en/print). Also if you want to make a paper coronavirus pass in addition to your CoronaCheck app.
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


{% capture copy_positive_before_vacc %}
<div markdown="1">
Were you tested positive, and did you receive your first injection after? Then you are fully vaccinated. You will receive a full vaccination certificate if your retrieved positive test result is from before your first injection.

From version 2.6.0 of the CoronaCheck app onwards, you’ll have the option to retrieve a positive test result after only one injection is found while retrieving your vaccination details. At this moment, you can only retrieve your most recent positive test result.

Were you tested positive more than once, with the first time happening before your first injection, but can only the result from a test that happened after be found? Please contact the healthcare provider who vaccinated you. They can help you create a full vaccination certificate.
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

<details class="details" id="vacc_othercountry"><summary><h3>Have you been vaccinated abroad? </h3></summary>
{{ copy_in_buitenland_gevaccineerd }}
</details>

</details>

{% comment %}
    Herstelbewijzen
{% endcomment %}

<details class="details" id="recovery"><summary><h2>I want to create a recovery certificate </h2></summary>
{{ copy_herstelbewijs }}

<details class="details" id="recovery_nodata">
<summary><h3>No details found</h3></summary>
{{ copy_geen_herstelbewijs_gegevens }}
</details>

<details class="details" id="recovery_dataincorrect">
<summary><h3>The details found are incorrect</h3></summary>
{{ copy_incorrecte_herstelgegevens }}
</details>

<details class="details" id="recovery_cantmakeproof">
<summary><h3>The app can't create a certificate/the certificate can't be extended</h3></summary>
{{ copy_we_kunnen_geen_herstelbewijs_maken }}
</details>

<details class="details" id="recovery_cantmakeintnlproof">
<summary><h3>I didn’t receive an international recovery certificate</h3></summary>
{{ copy_geen_internationaal_herstelbewijs }}
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

<details class="details" id="digid">
<summary><h2>I can’t login with DigiD</h2></summary>
{{ copy_digid }}
</details>

<details class="details" id="travel">
<summary><h2>Questions about travelling?</h2></summary>
{{ copy_travelquestions }}
</details>
