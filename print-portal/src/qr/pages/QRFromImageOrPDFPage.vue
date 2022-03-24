<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro
            :head="$t('qr.file.title')"
            :intro="$t('qr.file.description')"/>
        <div class="section-block">
            <QRFromImageOrPDF />
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import QRFromImageOrPDF from '@/qr/components/QRScanner/QRFromImageOrPDF.vue'
import PageIntro from '@/components/elements/PageIntro.vue';

export default Vue.extend({
    components: {
        Page,
        QRFromImageOrPDF,
        PageIntro
    }
})
</script>
