import axios from 'axios';

const sign = (signedEvents) => {
    console.log(JSON.stringify({ events: signedEvents }));
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: window.config.api + '/holder/print',
            data: { events: signedEvents }
        }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error);
        })
    })
}

export default {
    sign
}
