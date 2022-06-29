<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro" />
        <div class="section-block">
            <QRScannerNav v-if="routes" :routes="routes" />
            <CcButton
                v-if="next"
                @select="$router.push(next)"
                :label="button"
            />
            <PrintFaqLink v-if="link" :class="{ link: !!next }" v-bind="{ label, ...link }"/>
        </div>
    </div>
</Page>

</template>

<script>
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import PrintFaqLink from '@/components/views/4-print/PrintFaqLink.vue'
import QRScannerNav from '@/qr/components/QRScanner/QRScannerNav.vue'
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'
import CcButton from '@/components/elements/CcButton';

export default Vue.extend({
    mixins: [pageIntroMixin],
    components: {
        Page,
        PageIntro,
        PrintFaqLink,
        QRScannerNav,
        CcButton
    },
    props: {
        routes: {
            type: Array,
            required: false
        },
        link: {
            type: Object,
            required: false
        },
        next: {
            type: Object,
            required: false
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/styles/variables/sizes.scss";

.link {
    display: block;
    padding-top: 1em;
}
</style>
