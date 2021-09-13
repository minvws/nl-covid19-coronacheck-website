import axios from 'axios';
import { timeoutTime } from '@/data/constants'
import store from '@/store'
import { cmsDecode } from '@/tools/cms'

const collect = async (tokenSets, filter = '', eventProviderIdentifiers = '*') => {
    return new Promise((resolve, reject) => {
        const filteredTokenSets = tokenSets.filter(tokenSet => {
            if (eventProviderIdentifiers === '*') {
                return true;
            } else {
                return tokenSet.provider_identifier === eventProviderIdentifiers;
            }
        })
        getEvents(filteredTokenSets, filter).then(results => {
            resolve(results);
        }, (error) => {
            reject(error)
        })
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
            url: window.config.accessTokens,
            headers,
            timeout: timeoutTime
        }).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        })
    })
}

const getEvents = async (tokenSets, filter) => {
    const results = []
    for (const tokenSet of tokenSets) {
        const eventProvider = store.getters['eventProviders/getTestProviderByIdentifier'](tokenSet.provider_identifier);

        if (eventProvider) {
            let result;
            const resultForEventProvider = {
                eventProvider: tokenSet.provider_identifier,
                unomi: {
                    result: false,
                    error: null
                },
                events: {
                    result: null,
                    error: null,
                    parsingError: false
                }
            }
            try {
                result = await unomi(eventProvider, tokenSet, filter);
                resultForEventProvider.unomi.result = true;
            } catch (error) {
                resultForEventProvider.unomi.error = error;
            }
            if (result && result.informationAvailable) {
                try {
                    await getEvent(eventProvider, tokenSet, filter).then(signedEvent => {
                        resultForEventProvider.events.result = signedEvent;
                    })
                } catch (error) {
                    resultForEventProvider.events.error = error;
                }
            }
            results.push(resultForEventProvider)
        }
    }
    return results;
}

const unomi = async (eventProvider, tokenSet, filter) => {
    return new Promise((resolve, reject) => {
        const headers = {
            'Authorization': `Bearer ${tokenSet.unomi}`,
            'Content-Type': 'application/json',
            'CoronaCheck-Protocol-Version': '3.0'
        };
        axios({
            method: 'post',
            headers: headers,
            url: eventProvider.unomi_url,
            data: { filter: filter },
            timeout: timeoutTime
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
    })
}

const getEvent = async (eventProvider, tokenSet, filter) => {
    return new Promise((resolve, reject) => {
        const url = eventProvider.event_url;
        const headers = {
            'Authorization': `Bearer ${tokenSet.event}`,
            'Content-Type': 'application/json',
            'CoronaCheck-Protocol-Version': '3.0'
        };
        axios({
            method: 'post',
            headers: headers,
            url: url,
            data: { filter: filter },
            timeout: timeoutTime
        }).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error);
        })
    })
}

export default {
    getTokens,
    collect
}
