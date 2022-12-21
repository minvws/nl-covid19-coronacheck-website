import axios from 'axios';
import { timeoutTime } from '@/data/constants'

const sign = (signedEvents) => {
    const events = signedEvents.map((event, i) => ({ ...event, id: `${i}` }))
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: window.config.api + '/holder/print',
            data: { events },
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
