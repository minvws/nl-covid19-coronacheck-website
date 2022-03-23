import Vue, { VueConstructor } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { getter as QRGetter, action as QRAction } from '@/qr/store/qr/events'
import { QRData as QRDataType } from '@/qr/store/qr/types'

const moduleName = 'qr'

export type QRData = QRDataType

export default {
    computed: {
        ...mapGetters(moduleName, {
            captures: QRGetter.QR,
            result: QRGetter.PENDING,
            filteredResult: QRGetter.FILTER_PENDING
        })
    },
    methods: {
        ...mapActions(moduleName, {
            onAddQR: QRAction.ADD,
            onRemoveQR: QRAction.REMOVE,
            onAddPendingQR: QRAction.ADD_PENDING,
            onRemovePendingQR: QRAction.REMOVE_PENDING,
            onClearPendingQRS: QRAction.CLEAR_PENDING
        })
    }
}

export type QRMixinType = {
  onAddQR: (qr: QRData) => void
  onRemoveQR: (qr: QRData) => void
  onAddPendingQR: (qr: QRData) => void
  onRemovePendingQR: (qr: QRData) => void
  onClearPendingQRS: () => void
}

export type QRScannerType = {
  isPending: boolean
  error: null | string
  file: null | File
  src: null | string
  scanResult: null | string
  codesAdded: number
  onClear: () => void
  onScanFile: (file: File) => Promise<void>
  scanPDF: (file: File) => Promise<void>
}

export const QRMixin = Vue as VueConstructor<Vue & QRMixinType & QRScannerType>
