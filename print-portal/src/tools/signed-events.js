import axios from 'axios';

const collect = async (token) => {
    return new Promise((resolve, reject) => {
        getTokens(token).then((tokenSets) => {
            getEvents(tokenSets).then(events => {
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
                const payload = JSON.parse(atob(response.data.payload));
                resolve(payload.tokens);
            }
        }).catch((error) => {
            reject(error);
        })
    })
}

const getEvents = async (tokenSets) => {
    const allEvents = []
    for (const tokenSet of tokenSets) {
        // only do GGD for now
        if (tokenSet.provider_identifier === 'ZZZ') {
            await getEvent(tokenSet).then(signedEvent => {
                allEvents.push(signedEvent)
            })
        }
    }
    return allEvents;
}

const getEvent = async (tokenSet) => {
    return new Promise((resolve, reject) => {
        // todo replace hardcoded
        const url = 'https://api-test.coronatester.nl/api/event';
        const headers = {
            'Authorization': `Bearer ${tokenSet.unomi}`,
            'Content-Type': 'application/json'
        };
        axios({
            method: 'post',
            headers: headers,
            url: url
        }).then((response) => {
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
