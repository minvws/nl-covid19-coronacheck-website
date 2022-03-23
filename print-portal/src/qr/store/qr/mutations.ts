import { mutation as QRMutation } from './events'
import { QRData, QRState } from './types'

export const mutations = {
    [QRMutation.ADD]: ({ qrs }: QRState, qr: QRData): void => {
        qrs.push(qr)
    },
    [QRMutation.ADD_PENDING]: ({ pending }: QRState, qr: QRData): void => {
        pending.push(qr)
    },
    [QRMutation.CLEAR_PENDING]: ({ pending }: QRState): void => {
        pending.length = 0
    },
    [QRMutation.REMOVE_PENDING]: ({ pending }: QRState, qr: QRData): void => {
        const { result } = qr

        let remove = true
        while (remove) {
            const index = pending.findIndex(({ result: target }) => target === result)
            if (index === -1) remove = false
            else pending.splice(index, 1)
        }
    },
    [QRMutation.REMOVE]: ({ qrs }: QRState, qr: QRData): void => {
        while (qrs.includes(qr)) {
            const index = qrs.indexOf(qr)
            qrs.splice(index, 1)
        }
    }
}
