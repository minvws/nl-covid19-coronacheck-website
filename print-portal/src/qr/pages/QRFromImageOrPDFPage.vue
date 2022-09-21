<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro"/>
        <div class="section-block">
            <QRFromImageOrPDF v-bind="{ accept }"/>
        </div>
    </div>
</Page>

</template>

<script>
import Page from '@/components/elements/Page.vue';
import QRFromImageOrPDF from '@/qr/components/QRScanner/QRFromImageOrPDF.vue'
import PageIntro from '@/components/elements/PageIntro.vue';
import qrMixin, { QRMixin } from '@/qr/mixins/qr-mixin';
import letterCombinationMixin from '@/qr/mixins/lettercombination-mixin';
import { prettyFileExtensions } from '@/qr/utils/FileType'
import { getPageHeaderIntro } from '@/qr/utils/QRPage'

export default QRMixin.extend({
    mixins: [qrMixin, letterCombinationMixin],
    props: {
        accept: {
            type: String,
            required: false,
            default: 'image/jpeg,image/png,application/pdf'
        }
    },
    components: {
        Page,
        QRFromImageOrPDF,
        PageIntro
    },
    computed: {
        intro () {
            const acceptFileExtensions = prettyFileExtensions(this.accept, this.$t('qr.or'), false, '-')
            return getPageHeaderIntro(`${this.$route.name}`, { acceptFileExtensions })
        }
    }
})
</script>
