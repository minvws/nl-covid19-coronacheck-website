import axios from 'axios';
import { timeoutTime } from '@/data/constants'
import store from '@/store'
import { cmsDecode } from '@/tools/cms'
import { ProviderTypes } from '@/types/provider-types'

const filterTokensByProvider = (tokens, provider) => {
    if (provider === ProviderTypes.ANY_PROVIDER) return tokens
    return tokens.filter(({ provider_identifier }) => (provider === provider_identifier))
}

const collect = async (tokenSets, filter, provider, scope) => {
    return new Promise((resolve, reject) => {
        const tokens = filterTokensByProvider(tokenSets, provider)
        getEvents(tokens, filter, scope).then(results => {
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
            url: window.config.api + '/holder/access_tokens',
            headers,
            timeout: timeoutTime
        }).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        })
    })
}

const getEvents = async (tokenSets, filter, scope) => {
    const results = []
    for (const tokenSet of tokenSets) {
        // get provider by identifier AND filter
        const eventProvider = store.getters['eventProviders/getTestProviderByIdentifierAndUsage'](tokenSet.provider_identifier, filter);
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
                result = await unomi({ eventProvider, tokenSet, filter, scope });
                resultForEventProvider.unomi.result = true;
            } catch (error) {
                resultForEventProvider.unomi.error = error;
            }
            if (result && result.informationAvailable) {
                try {
                    await getEvent({ eventProvider, tokenSet, filter, scope }).then(signedEvent => {
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

const unomi = async ({ eventProvider, tokenSet, filter, scope }) => {
    return new Promise((resolve, reject) => {
        const url = eventProvider.unomi_url;
        const headers = {
            'Authorization': `Bearer ${tokenSet.unomi}`,
            'Content-Type': 'application/json',
            'CoronaCheck-Protocol-Version': '3.0'
        };
        axios({
            method: 'post',
            headers,
            url,
            data: {
                filter,
                scope
            },
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

const getEvent = async ({ eventProvider, tokenSet, filter, scope }) => {
    return new Promise((resolve, reject) => {
        const url = eventProvider.event_url;
        const headers = {
            'Authorization': `Bearer ${tokenSet.event}`,
            'Content-Type': 'application/json',
            'CoronaCheck-Protocol-Version': '3.0'
        };
        axios({
            method: 'post',
            headers,
            url,
            data: {
                filter,
                scope
            },
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
