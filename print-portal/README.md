### About
This is the print portal for coronaCheck  
See https://coronacheck.nl/nl/print/

### Required tools
- `nodejs` https://nodejs.org/en/download/
  * Use node v14, as the currently used version of node-sass doesn't support node v16.
- `Vue CLI` `npm install -g @vue/cli`
  
### Installation
- run `npm install` from this directory
- run `npm run serve`

### Other

#### nl-covid19-coronacheck-web-pdf-tools
One of the dependencies is `nl-covid19-coronacheck-web-pdf-tools`. This is a
library created by the CoronaCheck team, which handles the PDF creation. See
https://github.com/minvws/nl-covid19-coronacheck-web-pdf-tools.

#### Whitelisting
- You need to have your ip whitelisten to be accepted to https://tvs.acc.coronacheck.nl
- You need to run this on port 8080 `http://localhost:8080/nl/print/` this is beacuse
  of the whitelisted redirect urls.
