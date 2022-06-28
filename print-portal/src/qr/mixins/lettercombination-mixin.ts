import { QRMixin, QRData } from '@/qr/mixins/qr-mixin';
import { LetterCombination } from '@/qr/types/QRLetterCombinationType'

export default QRMixin.extend({
    props: {
        accepted: {
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
                if (value?.code && value?.result) {
                    this.$router.replace(this.accepted)
                } else if (!value?.code) {
                    this.$router.replace(this.rejected)
                }
            },
            immediate: true
        },
        captures (captures: QRData[]) {
            const [qrData] = captures
            const result = qrData?.result
            const code = this.letterCombination || {}
            this.setLetterCombination(
                result ? {
                    ...code,
                    result,
                    qrData
                } : null
            )
        }
    }
})
