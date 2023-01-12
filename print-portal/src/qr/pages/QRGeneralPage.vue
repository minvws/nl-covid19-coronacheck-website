<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro" :key="$route.name">
            <ErrorList v-if="errors && errors.length" v-bind="{ errors }" />
        </PageIntro>
        <div class="section-block">
            <QRScannerNav v-if="routes" :routes="routes" />
            <CcButton
                v-if="next"
                @select="onButton"
                :label="button"
                :class="{ 'with-icon': !!src }"
            >
                <img v-if="src" alt="" :src="src"/>
            </CcButton>
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
import ErrorList from '@/components/elements/ErrorList.vue';
export default Vue.extend({
    mixins: [pageIntroMixin],
    components: {
        Page,
        PageIntro,
        PrintFaqLink,
        QRScannerNav,
        ErrorList,
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
        },
        errors: {
            type: Array,
            required: false
        }
    },
    methods: {
        onButton () {
            const { replace, go, action } = this.next
            if (action) {
                action?.()
                return
            }
            if (go) this.$router.go(go)
            else if (replace) this.$router.replace(this.next)
            else this.$router.push(this.next)
        }
    },
    computed: {
        src () {
            return this.next?.icon?.src;
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

img {
    width: 20px;
    height: auto;
    margin-left: 12px;
}
.with-icon {
    padding: 13px 32px 13px 48px;
}
</style>
