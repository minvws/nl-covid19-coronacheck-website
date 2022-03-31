<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
       <PageIntro v-bind="intro" />
        <div
            class="section-block">
            <Loading/>
        </div>
    </div>
</Page>

</template>

<script>
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import Loading from '@/components/elements/Loading';
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'
import { LetterCombinationStatus } from '@/qr/types/QRLetterCombinationType'
import qrMixin, { QRMixin } from '../mixins/qr-mixin';

export default QRMixin.extend({
    mixins: [pageIntroMixin, qrMixin],
    components: {
        Page,
        PageIntro,
        Loading
    },
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
    created () {
        const { code: couplingCode, result: credential } = this.letterCombination || {}
        if (!couplingCode || !credential) {
            this.$router.replace(this.rejected)
            return
        }
        this.onSend({ couplingCode, credential })
    },
    methods: {
        async onSend (payload) {
            try {
                const { data: { status } } = await this.$axios({
                    method: 'post',
                    url: '/holder/coupling',
                    data: payload
                })
                switch (status) {
                case LetterCombinationStatus.ACCEPTED:
                    this.setLetterCombination(payload)
                    this.$router.replace(this.accepted)
                    break
                case LetterCombinationStatus.EXPIRED:
                case LetterCombinationStatus.BLOCKED:
                case LetterCombinationStatus.REJECTED:
                    this.$router.replace(this.rejected)
                    break
                default:
                }
            } catch (e) {
                this.$router.replace(this.rejected)
            }
        }
    }
})
</script>
