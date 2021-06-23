import axios from 'axios';
import store from '@/store'
import { cmsDecode } from '@/tools/cms'

const collect = async (token, filter = '') => {
    return new Promise((resolve, reject) => {
        getTokens(token).then((tokenSets) => {
            getEvents(tokenSets, filter).then(result => {
                resolve(result);
            }, (error) => {
                reject(error)
            })
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
            // console.log('provider_identifier', eventProvider.provider_identifier, eventProvider.unomi_url);
            try {
                result = await unomi(eventProvider, tokenSet, filter);
            } catch (error) {
                response.errors.push(error);
            }
            if (result && result.informationAvailable) {
                // console.log('unomi');
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
            'Authorization': `Bearer ${tokenSet.unomi}`,
            'Content-Type': 'application/json',
            'CoronaCheck-Protocol-Version': '3.0'
        };
        axios({
            method: 'post',
            headers: headers,
            url: url,
            data: { filter: filter }
        }).then((response) => {
            console.log(cmsDecode(response.data.payload));
            resolve(response.data)
        }).catch((error) => {
            reject(error);
        })
    })
}

export default {
    collect
}
