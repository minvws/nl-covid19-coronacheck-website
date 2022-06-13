import Vue, { VueConstructor } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { getter as QRGetter, action as QRAction } from '@/qr/store/qr/events'
import { QRData as QRDataType } from '@/qr/store/qr/types'
import { ERROR_QR_INVALID, ERROR_QR_INVALID_TYPE } from '@/qr/utils/QRScanner'
import { LetterCombination } from '@/qr/types/QRLetterCombinationType'

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
        errorDialogId (message: string) {
            switch (message) {
            case ERROR_QR_INVALID:
                return 'qr.dialog.invalid'
            case ERROR_QR_INVALID_TYPE:
                return 'qr.dialog.invalidType'
            default:
                return undefined
            }
        },
        openErrorInDialog (message: string) {
            const id = this.errorDialogId(message)
            if (id) {
                const message: unknown = this.$t(id)
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
  setLetterCombination: (combination: LetterCombination | null) => void
  letterCombination: LetterCombination;
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
