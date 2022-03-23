<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro
            :head="$t('views.chooseAddProof.pageHeader')"
            :intro="$t('views.chooseAddProof.pageIntro')"
        />
        <div class="section-block">
            <QRScannerNav class="nav" />
        </div>
    </div>
</Page>

</template>

<script lang="ts">
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import QRScannerNav from '@/qr/components/QRScanner/QRScannerNav.vue'

export default Vue.extend({
    components: {
        Page,
        PageIntro,
        QRScannerNav
    }
})
</script>

<style lang="scss" scoped>

.nav {
  ::v-deep a {
    display: block;
    text-decoration: none;
  }
}
</style>
