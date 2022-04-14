import Vue, { VueConstructor } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { getter as QRGetter, action as QRAction } from '@/qr/store/qr/events'
import { QRData as QRDataType } from '@/qr/store/qr/types'
import { ERROR_INVALID_QR } from '@/qr/utils/QRScanner'
export type QRData = QRDataType
export type Modal = { title: string, body: string }

const moduleName = 'qr'

export default Vue.extend({
    computed: {
        ...mapGetters(moduleName, {
            captures: QRGetter.QR,
            result: QRGetter.PENDING,
            filteredResult: QRGetter.FILTER_PENDING,
            letterCombination: QRGetter.CODE
        })
    },
    methods: {
        openErrorInDialog (message: string) {
            if (message === ERROR_INVALID_QR) {
                const message: unknown = this.$t('qr.dialog.invalid')
                this.openDialogError(message as Modal)
                return true
            }
            return false
        },
        openDialogError ({ title, body }: Modal) {
            this.$store.commit('modal/set', {
                messageHead: title,
                messageBody: body,
                showConfirm: false,
                closeButton: true
            })
        },
        ...mapActions(moduleName, {
            onAddQR: QRAction.ADD,
            onRemoveQR: QRAction.REMOVE,
            onAddPendingQR: QRAction.ADD_PENDING,
            onRemovePendingQR: QRAction.REMOVE_PENDING,
            onClearPendingQRS: QRAction.CLEAR_PENDING,
            onClearQRs: QRAction.CLEAR,
            setLetterCombination: QRAction.CODE
        })
    }
})

export type QRMixinType = {
  onAddQR: (qr: QRData) => void
  onRemoveQR: (qr: QRData) => void
  onAddPendingQR: (qr: QRData) => void
  onRemovePendingQR: (qr: QRData) => void,
  openErrorInDialog: (message: string) => boolean,
  openDialogError: (modal: Modal) => void,
  onClearPendingQRS: () => void
  setLetterCombination: (combination: any) => void // @TODO type
  letterCombination: any; // @TODO type
}

export type QRScannerType = {
  isPending: boolean
  error: null | string | Error
  file: null | File
  src: null | string
  scanResult: null | string
  codesAdded: number
  onClear: () => void
  onScanFile: (file: File) => Promise<void>
  scanPDF: (file: File) => Promise<void>
}

export const QRMixin = Vue as VueConstructor<Vue & QRMixinType & QRScannerType>
