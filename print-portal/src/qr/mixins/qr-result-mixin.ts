import Vue from 'vue'
import { ERROR_QR_DUPLICATE } from '@/qr/utils/QRScanner'

export default Vue.extend({
    props: {
        duplicates: {
            type: Boolean,
            required: false,
            default: false
        },
        captures: {
            type: Array as () => { result: string; src: string }[],
            required: true
        }
    },
    watch: {
        result: {
            handler(result: { result: string; src: string }[]) {
                if (!result) return
                this.onScan(result)
            },
            immediate: true
        }
    },
    methods: {
        isAlreadyScanned(target: string): boolean {
            return !!this.captures.find(({ result }) => result === target)
        },
        onScanResult(result: string, src?: string) {
            if (!this.duplicates && this.isAlreadyScanned(result)) {
                this.$emit('error', ERROR_QR_DUPLICATE)
                this.$emit('remove-pending', { result, src })
                return
            }
            this.$emit('capture', { result, src })
        },
        onScan(results: { result: string; src: string }[]) {
            results.forEach(({ result, src }) => this.onScanResult(result, src))
        }
    }
})
