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
import { decodeQRtoDCC } from '@/qr/utils/DCCDecoder'
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
        },
        blocked: {
            type: Object,
            required: true
        },
        expired: {
            type: Object,
            required: true
        }
    },
    created () {
        const { code: couplingCode, result: credential } = this.letterCombination || {}
        if (!couplingCode || !credential) {
            this.onFail(this.rejected)
            return
        }
        this.onSend({ couplingCode, credential })
    },
    methods: {
        onSuccess (payload) {
            const { result } = decodeQRtoDCC(payload.credential)
            this.$store.dispatch('signedEvents/addProof', { result, payload });
            this.$router.replace(this.accepted)
        },
        onFail (route) {
            // remove QR from scanned qrs
            const { qrData, code } = this.letterCombination ?? {}
            if (qrData) this.onRemoveQR(qrData)
            // clear letterCombination, but keep last entered code
            this.setLetterCombination({ code })
            // change route
            this.$router.replace(route)
        },
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
                    this.onSuccess(payload)
                    break
                case LetterCombinationStatus.BLOCKED:
                    this.onFail(this.blocked)
                    break
                case LetterCombinationStatus.EXPIRED:
                    this.onFail(this.expired)
                    break
                case LetterCombinationStatus.REJECTED:
                    this.onFail(this.rejected)
                    break
                default:
                }
            } catch (e) {
                this.onFail(this.rejected)
            }
        }
    }
})
</script>
