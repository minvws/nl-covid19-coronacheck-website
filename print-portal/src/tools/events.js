import axios from 'axios';

const collect = async (code) => {
    return new Promise((resolve, reject) => {
        getTokens().then((tokenSets) => {
            getEvents(tokenSets).then(events => {
                resolve(events);
            })
        })
    })
}

const getTokens = async () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://api-ct.bananenhalen.nl/v2/holder/identity_hashes/?debug&bsn=999999011'
        }).then((response) => {
            if (response.data && response.data.tokens) {
                resolve(response.data.tokens);
            }
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
    })
}

const getEvents = async (tokenSets) => {
    const allEvents = []
    for (const tokenSet of tokenSets) {
        // only do GGD for now
        if (tokenSet.provider_identifier === 'GGD') {
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

// const decrypt = (string) => {
//     return JSON.parse(atob(string))
// }

export default {
    collect
}
