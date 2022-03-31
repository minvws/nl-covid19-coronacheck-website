<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <pre>{{ captures }}</pre>
        <pre>{{ $store.getters['qr/CODE'] }}</pre>
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
import mixin, { QRMixin } from '@/qr/mixins/qr-mixin';
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'
import { LetterCombination } from '@/qr/types/QRLetterCombinationType'

export default QRMixin.extend({
    mixins: [mixin, pageIntroMixin],
    components: {
        Page,
        QRFromImageOrPDF,
        PageIntro
    },
    watch: {
        letterCombination (value: LetterCombination) {
            if (!value || !value.code || !value.result) {
                alert('uhoh')
            } else {
                alert('ok')
                this.$router.push({ name: 'letterCombinationValidation' })
            }
        },
        captures (captures) {
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
