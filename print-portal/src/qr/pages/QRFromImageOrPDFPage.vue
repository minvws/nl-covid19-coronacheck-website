<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro"/>
        <div class="section-block">
            <QRFromImageOrPDF />
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Page from '@/components/elements/Page.vue';
import QRFromImageOrPDF from '@/qr/components/QRScanner/QRFromImageOrPDF.vue'
import PageIntro from '@/components/elements/PageIntro.vue';
import qrMixin, { QRMixin, QRData } from '@/qr/mixins/qr-mixin';
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'
import { LetterCombination } from '@/qr/types/QRLetterCombinationType'

export default QRMixin.extend({
    mixins: [qrMixin, pageIntroMixin],
    components: {
        Page,
        QRFromImageOrPDF,
        PageIntro
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
            const [capture] = captures
            const result = capture?.result
            const code = this.letterCombination || {}
            this.setLetterCombination(
                result ? {
                    ...code,
                    result
                } : null
            )
        }
    }

})
</script>
