<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro" />
        <div class="section-block">
            <img
                class="image-qr"
                src="~@/qr/assets/img/qr.svg"
                alt=""
            />
             <CcButton
                v-if="next"
                @select="onNext()"
                :label="$t('next')"/>
            <PrintFaqLink
                v-if="link"
                class="link"
                v-bind="{ label, ...link }"
            />
        </div>
    </div>
</Page>

</template>

<script>
import Vue from 'vue'
import Page from '@/components/elements/Page.vue';
import PageIntro from '@/components/elements/PageIntro.vue';
import CcButton from '@/components/elements/CcButton';
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'
import PrintFaqLink from '@/components/views/4-print/PrintFaqLink.vue'

export default Vue.extend({
    mixins: [pageIntroMixin],
    components: {
        Page,
        PageIntro,
        CcButton,
        PrintFaqLink
    },
    props: {
        routes: {
            type: Array,
            required: false
        },
        next: {
            type: Object,
            required: false
        },
        link: {
            type: Object,
            required: false
        }
    },
    methods: {
        onNext () {
            const { next } = this
            if (!next) return
            const { to: { name } } = next
            this.$router.push({ name });
        }
    }
})
</script>
<style lang="scss" scoped>
.image-qr {
    display: block;
    margin-top: -1em;
    margin-bottom: 2em;
}
.link {
    display: block;
    padding-top: 1em;
}
</style>
