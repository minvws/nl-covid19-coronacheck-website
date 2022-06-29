<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro" />
        <div class="section-block">
            <LetterValidation
                class="code"
                v-model="value"
                v-bind="{
                    error,
                    value,
                    translation: `views.${name}`
                }"
                @submit="onSubmit"
            >
                <PrintFaqLink class="link" v-if="link" v-bind="{ label, ...link }"/>
            </LetterValidation>
        </div>
    </div>
</Page>

</template>

<script>
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import PrintFaqLink from '@/components/views/4-print/PrintFaqLink.vue'
import { isValidLetterCombination, isValidLetterCombinationLengthExceeded, isValidLetterCombinationLengthError } from '@/qr/utils/QRScanner'
import LetterValidation from '@/qr/components/LetterValidation.vue'
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'
import qrMixin, { QRMixin } from '@/qr/mixins/qr-mixin';

export default QRMixin.extend({
    mixins: [pageIntroMixin, qrMixin],
    components: {
        Page,
        PageIntro,
        PrintFaqLink,
        LetterValidation
    },
    props: {
        routes: {
            type: Array,
            required: false
        },
        link: {
            type: Object,
            required: false
        },
        next: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            error: '',
            value: ''
        }
    },
    created () {
        this.value = this.letterCombination?.code || ''
    },
    watch: {
        value (code, before) {
            const exceeded = isValidLetterCombinationLengthError(before)
            if (exceeded) {
                this.error = this.translate('invalidCodeLength', { count: exceeded })
            } else {
                this.error = ''
            }

            while (isValidLetterCombinationLengthExceeded(code)) {
                code = code.substr(0, code.length - 1)
            }
            this.value = code.toUpperCase()
        }
    },
    methods: {
        translate (id, params) {
            return this.$t(`views.${this.name}.${id}`, params)
        },
        onValidate (code) {
            if (!code) {
                this.error = this.translate('emptyCode')
            } else if (!isValidLetterCombination(code)) {
                this.error = this.translate('invalidCode')
            } else this.error = ''
        },
        onSubmit () {
            const code = this.value
            this.onValidate(code)
            if (this.error) return
            const combination = { ...(this.letterCombination || {}), code }
            this.setLetterCombination(combination)
            if (this.next.replace) this.$router.replace(this.next)
            else this.$router.push(this.next)
        }
    }
})
</script>

<style lang="scss" scoped>
.code {
   ::v-deep .input__set {
       margin: 0;
   }
}
.link {
    display: block;
    padding-bottom: 2em;
}
</style>
