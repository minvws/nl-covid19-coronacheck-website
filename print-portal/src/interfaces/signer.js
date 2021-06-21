import axios from 'axios';
// import mockProof from '@/data/mock/proof';

const sign = (signedEvents) => {
    console.log(signedEvents);
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
