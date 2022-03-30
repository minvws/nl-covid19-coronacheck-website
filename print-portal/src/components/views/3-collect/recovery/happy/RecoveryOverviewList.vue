<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
         <PageIntro v-bind="intro"/>
           <div class="section-block">
                 <VaccinationSummary
                    :signed-event-set="signedVaccinations"
                />
                <CcButton
                    @select="$router.push(next)"
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
import VaccinationSummary from '@/components/views/3-collect/vaccination/happy/VaccinationSummary.vue';
import vaccinationOverviewMixin from '@/components/views/3-collect/_shared/vaccination-overview-mixin'
import CcButton from '@/components/elements/CcButton';
// import { FilterTypes } from '@/types/filter-types'

import { getPageHeaderIntro, getPageLink, getPageButton } from '@/qr/utils/QRPage'

export default Vue.extend({
    mixins: [vaccinationOverviewMixin],
    components: {
        Page,
        PageIntro,
        VaccinationSummary,
        CcButton,
        PrintFaqLink
    },
    props: {
        link: {
            type: Object,
            required: false
        }
    },
    computed: {
        next () {
            return { name: 'vaccinationOverview', params: this.$route.params }
        },
        name () {
            const { name } = this.$route
            return name ?? ''
        },
        label () {
            return getPageLink(this.name)
        },
        button () {
            return getPageButton(this.name)
        },
        intro () {
            return getPageHeaderIntro(this.name)
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
