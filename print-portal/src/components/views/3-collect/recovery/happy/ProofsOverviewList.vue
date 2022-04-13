<template>

<Page
    @back="$router.go(-1)">
    <div class="section">
        <pre>{{ $props }}</pre>
         <PageIntro v-bind="intro"/>
           <div class="section-block">
                 <VaccinationSummary
                    :signed-event-set="vaccinationSummary"
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
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'

export default Vue.extend({
    mixins: [pageIntroMixin, vaccinationOverviewMixin],
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
            required: true
        },
        next: {
            type: Object,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    computed: {
        name () {
            return this.id
        },
        vaccinationSummary () {
            return [
                ...this.signedVaccinations,
                ...[this.$store.state.signedEvents.addedProofs]
            ]
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
