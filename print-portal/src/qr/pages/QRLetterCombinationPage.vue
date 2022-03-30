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
import { getPageHeaderIntro, getPageLink } from '@/qr/utils/QRPage'
import { isValidLetterCombination } from '@/qr/utils/QRScanner'
import ProvideTestCode from '@/components/views/3-collect/negative-test/provide-code/ProvideTestCode.vue'

export default Vue.extend({
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
    computed: {
        name () {
            const { name } = this.$route
            return name ?? ''
        },
        label () {
            return getPageLink(this.name)
        },
        intro () {
            return getPageHeaderIntro(this.name)
        }
    },
    watch: {
        '$store.state.testCode' () {
            this.error = ''
        }
    },
    methods: {
        translate (id) {
            return this.$t(`views.${this.name}.${id}`)
        },
        clearTestCode () {
            alert('sja')
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
            this.onValidate(code)
            if (this.error) return
            console.log('onSend', '@TODO: call onSend')
        },
        async onSend (payload) {
            try {
                const { data: { status } } = await this.$axios({
                    method: 'post',
                    url: '/holder/coupling',
                    data: payload
                })
                switch (status) {
                case 'accepted':
                    this.$store.dispatch('qr/CODE', payload)
                    this.$router.push(this.next)
                    break
                case 'rejected':
                    this.error = this.translate('rejectedCode')
                    break
                default:
                }
            } catch (e) {
                this.error = e.response.statusText
            }
        },
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
