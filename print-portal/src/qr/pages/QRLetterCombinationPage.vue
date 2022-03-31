<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro" />
        <div class="section-block">
            <ProvideTestCode
                class="code"
                @submit="onSubmit"
                :translation="`views.${name}`"
                :test-code-status="{
                    error
                }"
                :clear-test-code="true"
                :verification-needed="false"
            >
                <PrintFaqLink class="link" v-if="link" v-bind="{ label, ...link }"/>
            </ProvideTestCode>
        </div>
    </div>
</Page>

</template>

<script>
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import PrintFaqLink from '@/components/views/4-print/PrintFaqLink.vue'
import { isValidLetterCombination, isValidLetterCombinationLengthExceeded, isValidLetterCombinationLengthError } from '@/qr/utils/QRScanner'
import ProvideTestCode from '@/components/views/3-collect/negative-test/provide-code/ProvideTestCode.vue'
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'

export default Vue.extend({
    mixins: [pageIntroMixin],
    components: {
        Page,
        PageIntro,
        PrintFaqLink,
        ProvideTestCode
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
            error: ''
        }
    },
    watch: {
        '$store.state.testCode' (code, before) {
            const exceeded = isValidLetterCombinationLengthError(before)
            if (exceeded) {
                this.error = this.translate('invalidCodeLength', { count: exceeded })
            } else {
                this.error = ''
            }

            while (isValidLetterCombinationLengthExceeded(code)) {
                code = code.substr(0, code.length - 1)
            }
            // @TODO: do not like this thingy
            this.$store.commit('resetProvideCode');
            this.$store.commit('updateProperty', { key: 'testCode', value: code })
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
            const code = this.$store.state.testCode
            console.log({ code })
            this.onValidate(code)
            if (this.error) return
            this.$store.dispatch('qr/CODE', { code })
            this.$router.push(this.next)
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
