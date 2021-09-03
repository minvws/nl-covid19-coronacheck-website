import axios from 'axios';
import { timeoutTime } from '@/data/constants'

const sign = (signedEvents) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: window.config.api + '/holder/print',
            data: { events: signedEvents },
            timeout: timeoutTime
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
