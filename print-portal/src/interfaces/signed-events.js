import axios from 'axios';
import store from '@/store'
import { cmsDecode } from '@/tools/cms'
import { errors, testScenarios } from '@/data/scenarios/test-scenarios'

const testing = false;
const testScenario = testScenarios[6];

const mockAPI = (code) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'https://httpstat.us/' + code
        }).then((response) => {
            console.log('ok');
        }).catch((error) => {
            reject(error);
        })
    })
}

const collect = async (token, filter = '') => {
    return new Promise((resolve, reject) => {
        if (testing && testScenario.collect) {
            if (testScenario.busy) {
                mockAPI(429).catch((error) => reject(error))
            } else {
                if (testScenario.details) {
                    reject(errors[1])
                } else {
                    reject(errors[0])
                }
            }
        } else {
            getTokens(token).then((tokenSets) => {
                getEvents(tokenSets, filter).then(result => {
                    resolve(result);
                }, (error) => {
                    reject(error)
                })
            }, (error) => {
                reject(error)
            })
        }
    })
}

const getTokens = async (token) => {
    return new Promise((resolve, reject) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        axios({
            method: 'post',
            url: 'https://holder-api.acc.coronacheck.nl/v4/holder/access_tokens',
            headers
        }).then((response) => {
            if (response.data && response.data.payload) {
                const payload = cmsDecode(response.data.payload)
                resolve(payload.tokens);
            }
        }).catch((error) => {
            reject(error);
        })
    })
}

const getEvents = async (tokenSets, filter) => {
    const response = {
        events: [],
        errors: [],
        hasAtLeastOneUnomi: false
    }
    for (const tokenSet of tokenSets) {
        const eventProvider = store.getters['eventProviders/getTestProviderByIdentifier'](tokenSet.provider_identifier);

        let result;
        if (eventProvider) {
            console.log('provider_identifier', eventProvider.provider_identifier, eventProvider.unomi_url);
            try {
                result = await unomi(eventProvider, tokenSet);
            } catch (error) {
                console.log('error');
                console.dir(error);
                response.errors.push(error);
            }
            if (result && result.informationAvailable) {
                console.log('unomi');
                response.hasAtLeastOneUnomi = true;
                await getEvent(eventProvider, tokenSet, filter).then(signedEvent => {
                    response.events.push(signedEvent)
                })
            }
        }
    }
    return response;
}

const unomi = async (eventProvider, tokenSet) => {
    return new Promise((resolve, reject) => {
        if (testing && testScenario.provider && eventProvider.provider_identifier === testScenario.provider) {
            if (testScenario.busy) {
                mockAPI(429).catch((error) => reject(error))
            } else if (testScenario.error) {
                mockAPI(505).catch((error) => reject(error))
            }
        } else {
            const headers = {
                'Authorization': `Bearer ${tokenSet.unomi}`,
                'Content-Type': 'application/json'
            };
            axios({
                method: 'post',
                headers: headers,
                url: eventProvider.unomi_url
            }).then((response) => {
                if (response.data && response.data.payload) {
                    const payload = cmsDecode(response.data.payload)
                    resolve(payload)
                } else {
                    resolve();
                }
            }).catch((error) => {
                reject(error);
            })
        }
    })
}

const getEvent = async (eventProvider, tokenSet, filter) => {
    return new Promise((resolve, reject) => {
        const url = eventProvider.event_url;
        const headers = {
            'Authorization': `Bearer ${tokenSet.unomi}`,
            'Content-Type': 'application/json'
        };
        axios({
            method: 'post',
            headers: headers,
            url: url,
            data: { filter: filter }
        }).then((response) => {
            // console.log(cmsDecode(response.data.payload));
            resolve(response.data)
        }).catch((error) => {
            reject(error);
        })
    })
}

export default {
    collect
}
