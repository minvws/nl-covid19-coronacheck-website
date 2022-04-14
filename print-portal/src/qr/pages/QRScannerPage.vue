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
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import QRFromCamera from '@/qr/components/QRScanner/QRFromCamera.vue'

export default Vue.extend({
    components: {
        Page,
        QRFromCamera
    }
})
</script>
