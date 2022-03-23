import { QRData, QRState } from './types'
import { getter as QRGetter } from './events'

export const getters = {
    [QRGetter.QR]: ({ qrs }: QRState): QRData[] => {
        return qrs
    },
    [QRGetter.PENDING]: ({ pending }: QRState): QRData[] => {
        return pending
    },
    [QRGetter.FILTER_PENDING]:
        ({ pending }: QRState) =>
            (target: string): QRData[] => {
                return pending.filter(({ result }) => result !== target)
            }
}
