<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <div class="section-block">
            <QRScanner />
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import QRScanner from '@/qr/components/QRScanner/index.vue'

export default Vue.extend({
    components: {
        Page,
        QRScanner
    }
})
</script>
