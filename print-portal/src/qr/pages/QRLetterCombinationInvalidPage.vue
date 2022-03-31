<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <PageIntro v-bind="intro"/>
        <div class="section-block">
            <CcButton
                v-if="next"
                @select="onNext"
                :label="button"
            />
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
import PrintFaqLink from '@/components/views/4-print/PrintFaqLink.vue'
import CcButton from '@/components/elements/CcButton';
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'

export default Vue.extend({
    mixins: [pageIntroMixin],
    components: {
        Page,
        PageIntro,
        PrintFaqLink,
        CcButton
    },
    methods: {
        onNext () {
            this.$router.replace(this.next)
        }
    },
    props: {
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
.link {
    display: block;
    padding-top: 1em;
}
</style>
