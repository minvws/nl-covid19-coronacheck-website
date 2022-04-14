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
import qrMixin, { QRMixin } from '@/qr/mixins/qr-mixin';
import letterCombinationMixin from '@/qr/mixins/lettercombination-mixin';
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'

export default QRMixin.extend({
    mixins: [qrMixin, letterCombinationMixin, pageIntroMixin],
    components: {
        Page,
        QRFromImageOrPDF,
        PageIntro
    }
})
</script>
