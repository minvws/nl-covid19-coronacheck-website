import axios from 'axios';
import store from '@/store'
import { cmsDecode } from '@/tools/cms'

const collect = async (token, filter = '') => {
    return new Promise((resolve, reject) => {
        getTokens(token).then((tokenSets) => {
            console.log(tokenSets);
            getEvents(tokenSets, filter).then(events => {
                resolve(events);
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
    const allEvents = []
    for (const tokenSet of tokenSets) {
        // only do GGD for now
        if (tokenSet.provider_identifier === 'ZZZ') {
            const eventProvider = store.getters['eventProviders/getTestProviderByIdentifier'](tokenSet.provider_identifier);
            if (eventProvider) {
                const result = await unomi(eventProvider, tokenSet)
                if (result && result.informationAvailable) {
                    await getEvent(eventProvider, tokenSet, filter).then(signedEvent => {
                        allEvents.push(signedEvent)
                    })
                }
            }
        }
    }
    return allEvents;
}

const unomi = async (eventProvider, tokenSet) => {
    return new Promise((resolve, reject) => {
        const url = eventProvider.unomi_url;
        const headers = {
            'Authorization': `Bearer ${tokenSet.unomi}`,
            'Content-Type': 'application/json'
        };
        axios({
            method: 'post',
            headers: headers,
            url: url
        }).then((response) => {
            const payload = cmsDecode(response.data.payload)
            resolve(payload)
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
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
            console.log(response.data);
            resolve(response.data)
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
    })
}

export default {
    collect
}
