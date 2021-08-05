import axios from 'axios';
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
        getEvents(filteredTokenSets, filter).then(result => {
            resolve(result);
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
            headers
        }).then((response) => {
            resolve(response);
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
            try {
                result = await unomi(eventProvider, tokenSet, filter);
            } catch (error) {
                response.errors.push(error);
            }
            if (result && result.informationAvailable) {
                response.hasAtLeastOneUnomi = true;
                try {
                    await getEvent(eventProvider, tokenSet, filter).then(signedEvent => {
                        response.events.push(signedEvent)
                    })
                } catch (error) {
                    response.errors.push(error);
                }
            }
        }
    }
    return response;
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
            data: { filter: filter }
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
            data: { filter: filter }
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
