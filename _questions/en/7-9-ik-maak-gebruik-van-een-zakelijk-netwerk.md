---
set: 7
index: 9
title: I'm using a corporate network, how can I still use CoronaCheck?
---
To use CoronaCheck within a corporate network, the below IP ranges and/or DNS zones have to be made available.

For the CoronaCheck application:
- [coronacheck.nl](http://coronacheck.nl/)
- [holder-api.coronacheck.nl](http://holder-api.coronacheck.nl/)
- [holder-api-cdn.coronacheck.nl](http://holder-api-cdn.coronacheck.nl/)

For the CoronaCheck Scanner application:
- [verifier-api.coronacheck.nl](http://verifier-api.coronacheck.nl/)
- [verifier-api-cdn.coronacheck.nl](http://verifier-api-cdn.coronacheck.nl/)

If this cannot be done based on DNS, but has to be based on IP ranges, please use the following:
- 62.204.64.0/24
- 62.204.67.0/24
- 2a00:d00:123::/48
