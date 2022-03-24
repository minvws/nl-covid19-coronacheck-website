<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro" />
        <div class="section-block">
            <QRScannerNav :routes="routes" />
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import QRScannerNav from '@/qr/components/QRScanner/QRScannerNav.vue'
import { getPageHeaderIntro } from '@/qr/utils/QRPage'
export default Vue.extend({
    components: {
        Page,
        PageIntro,
        QRScannerNav
    },
    props: {
        routes: {
            type: Array,
            required: true
        }
    },
    computed: {
        intro () {
            const { name } = this.$route
            return getPageHeaderIntro(name ?? '')
        }
    }
})
</script>
