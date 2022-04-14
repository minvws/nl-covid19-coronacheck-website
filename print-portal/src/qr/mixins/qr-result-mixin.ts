import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'

export default Vue.extend({
    data() {
        return {
            dialog: null as null | TranslateResult
        }
    },
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
                this.dialog = this.$t('qr.dialog.duplicate')
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
