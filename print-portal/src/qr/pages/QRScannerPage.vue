<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <div class="section-block">
            <QRFromCamera />
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Page from '@/components/elements/Page.vue';
import QRFromCamera from '@/qr/components/QRScanner/QRFromCamera.vue'
import letterCombinationMixin from '@/qr/mixins/lettercombination-mixin';
import qrMixin, { QRMixin } from '@/qr/mixins/qr-mixin';

export default QRMixin.extend({
    mixins: [qrMixin, letterCombinationMixin],
    components: {
        Page,
        QRFromCamera
    }
})
</script>
