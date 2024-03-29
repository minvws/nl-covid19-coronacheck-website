/*eslint-disable*/
import { QRMixin, QRData } from '@/qr/mixins/qr-mixin';
import { LetterCombination } from '@/qr/types/QRLetterCombinationType'
import { decodeQRtoDCC } from '@/qr/utils/DCCDecoder'

export default QRMixin.extend({
    props: {
        accepted: {
            type: Object,
            required: true
        },
        validation: {
            type: Object,
            required: true
        },
        rejected: {
            type: Object,
            required: true
        }
    },
    watch: {
        letterCombination: {
            handler (value: LetterCombination) {
                if (!value) return
                const { dcc, validate } = value
                if (!dcc) return
                // needs lettercombination check
                if (validate) this.$router.replace(this.validation)
                else this.$router.replace(this.accepted)
            },
            immediate: true
        },
        captures (captures: QRData[]) {
            const [qrData] = captures
            const result = qrData?.result
            const code = this.letterCombination || {}
            const dcc = decodeQRtoDCC(result)

            // needs letterCombination
            const validate = ['NL'].includes(dcc.issuer)

            this.setLetterCombination(
                result ? {
                    ...code,
                    result,
                    qrData,
                    dcc,
                    validate,
                } : null
            )
        }
    }
})
