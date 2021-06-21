// import axios from 'axios';
import mockProof from '@/data/mock/proof';

const sign = (signedEvents) => {
    return new Promise((resolve, reject) => {
        // axios({
        //     method: 'post',
        //     url: '/staticproof/paper',
        //     data: { events: signedEvents }
        // }).then((response) => {
        //     resolve(response)
        // }).catch((error) => {
        //     reject(error);
        // })
        resolve(mockProof)
    })
}

export default {
    sign
}
