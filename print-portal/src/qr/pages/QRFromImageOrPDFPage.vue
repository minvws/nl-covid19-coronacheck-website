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
export default QRMixin.extend({
    mixins: [mixin, pageIntroMixin],
    components: {
        Page,
        QRFromImageOrPDF,
        PageIntro
    },
    watch: {
        code (code) {
            alert('deze ' + code)
        },
        captures (captures) {
            const [capture] = captures
            const result = capture?.result
            const code = this.code || {}
            this.$store.dispatch('qr/CODE', result ? {
                ...code,
                result
            } : null)
        }
    }

})
</script>
