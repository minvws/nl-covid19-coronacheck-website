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

#### dcc-pdf-tools
Inside package.json there is ao `dcc-pdf-tools`, this is a library 
created by the CoronaCheck team, which handles the PDF creation.  
See https://github.com/91divoc-ln/dcc-pdf-tools/

#### Whitelisting
- You need to have your ip whitelisten to be accepted to https://tvs.acc.coronacheck.nl
- You need to run this on port 8080 `http://localhost:8080/nl/print/` this is beacuse
  of the whitelisted redirect urls.
