import { action as QRAction, mutation as QRMutation } from './events'
import { QRData, QRActionContext } from './types'

export const actions = {
    [QRAction.ADD]({ commit }: QRActionContext, qr: QRData): void {
        commit(QRMutation.ADD, qr)
        commit(QRMutation.REMOVE_PENDING, qr)
    },
    [QRAction.ADD_PENDING]({ commit }: QRActionContext, qr: QRData): void {
        commit(QRMutation.ADD_PENDING, qr)
    },
    [QRAction.REMOVE_PENDING]({ commit }: QRActionContext, qr: QRData): void {
        commit(QRMutation.REMOVE_PENDING, qr)
    },
    [QRAction.CLEAR_PENDING]({ commit }: QRActionContext, qr: QRData): void {
        commit(QRMutation.CLEAR_PENDING, qr)
    },
    [QRAction.REMOVE]({ commit }: QRActionContext, qr: QRData): void {
        commit(QRMutation.REMOVE, qr)
    }
}
