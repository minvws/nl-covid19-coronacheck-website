import Vue, { VueConstructor } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { getter as QRGetter, action as QRAction } from '@/qr/store/qr/events'
import { QRData as QRDataType } from '@/qr/store/qr/types'
import { Event, getHolderFromEvents, Holder } from '@/qr/utils/HolderUtil'
import { ERROR_QR_DOMESTIC, ERROR_QR_INVALID, ERROR_QR_INVALID_TYPE, ERROR_QR_DUPLICATE, ERROR_QR_MISMATCH, NO_QR_CODE_FOUND } from '@/qr/utils/QRScanner'
import { LetterCombination } from '@/qr/types/QRLetterCombinationType'
import { CameraState } from '../types/QRScannerDataType'
import { RouterNames } from '@/qr/router'

export type QRData = QRDataType
type ModalActions = {label: string, action: () => void }[]
export type Modal = { title: string, body: string, actions?: ModalActions }

const moduleName = 'qr'

export type QRMixinType = {
    onAddQR: (qr: QRData) => void
    onRemoveQR: (qr: QRData) => void
    onAddPendingQR: (qr: QRData) => void
    onRemovePendingQR: (qr: QRData) => void,
    openErrorInDialog: (message: string, actions?: ModalActions) => boolean,
    openErrorInPageOrDialog: (message: string, actions?: ModalActions) => boolean,
    openDialogError: (modal: Modal, actions?: ModalActions) => void,
    onClearPendingQRS: () => void
    setLetterCombination: (combination: LetterCombination | null) => void
    letterCombination: LetterCombination;
    errorMessageId: (message: string) => string | undefined;
    events: Event[];
    holder: Holder;
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

export default QRMixin.extend({
    computed: {
        ...mapGetters(moduleName, {
            captures: QRGetter.QR,
            result: QRGetter.PENDING,
            filteredResult: QRGetter.FILTER_PENDING,
            letterCombination: QRGetter.CODE
        }),
        events () {
            return this.$store.getters['signedEvents/getProofEvents']('all');
        },
        holder () {
            return getHolderFromEvents(this.events);
        }
    },
    methods: {
        errorMessageId (message: string) {
            switch (message) {
            case CameraState.NO_CAMERA:
                return 'qr.dialog.no-camera'
            case ERROR_QR_MISMATCH:
                return 'qr.dialog.mismatch'
            case ERROR_QR_DUPLICATE:
                return 'qr.dialog.duplicate'
            case ERROR_QR_INVALID:
                return 'qr.dialog.invalid'
            case ERROR_QR_DOMESTIC:
                return 'qr.dialog.domestic'
            case ERROR_QR_INVALID_TYPE:
                return 'qr.dialog.invalidType'
            default:
                return undefined
            }
        },
        openErrorInPageOrDialog (message: string) {
            const id = message === NO_QR_CODE_FOUND ? 'NO_QR_CODE_FOUND' : message
            const name = (RouterNames as Record<string, string>)[id]
            if (!name) return false;
            this.$router.push({ name })
            return true
        },
        openErrorInDialog (message: string, actions?: ModalActions) {
            const id = this.errorMessageId(message)
            if (id) {
                const message = this.$t(id) as Record<string, unknown>
                const modal = { ...message, actions } as Modal
                this.openDialogError(modal)
                return true
            }
            return false
        },
        openDialogError ({ title, body, actions }: Modal) {
            this.$store.commit('modal/set', {
                messageHead: title,
                messageBody: body,
                showConfirm: false,
                closeButton: true,
                actions
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
