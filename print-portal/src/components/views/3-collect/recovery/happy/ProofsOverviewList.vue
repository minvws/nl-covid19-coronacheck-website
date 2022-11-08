<template>

<Page
    @back="back">
    <div class="section">
         <PageIntro v-bind="intro"/>
           <div class="section-block">
                <ProofsSummary v-bind="{
                    events
                }" />
                <CcButton
                    @select="$router.push({ ...next, params: { message} } )"
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
import vaccinationOverviewMixin from '@/components/views/3-collect/_shared/vaccination-overview-mixin'
import CcButton from '@/components/elements/CcButton';
import pageIntroMixin from '@/qr/mixins/page-intro-mixin'
import ProofsSummary from '@/components/views/4-print/proofs/ProofsSummary.vue';

export default Vue.extend({
    mixins: [pageIntroMixin, vaccinationOverviewMixin],
    components: {
        Page,
        PageIntro,
        CcButton,
        PrintFaqLink,
        ProofsSummary
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
        },
        message: {
            type: String,
            required: false
        }

    },
    methods: {
        back () {
            const confirmAction = () => {
                this.$store.commit('clearAll')
                this.$router.replace({ name: 'ChoiceProof' });
            }

            const { head, body, yes, no } = this.$t('message.info.areYouSureToCancel')

            this.$store.commit('modal/set', {
                messageHead: head,
                messageBody: body,
                confirmYes: yes,
                confirmNo: no,
                confirm: true,
                closeButton: false,
                confirmAlert: true,
                confirmAction
            })
        }
    },
    computed: {
        name () {
            return this.id
        },
        events () {
            const events = this.$store.getters['signedEvents/getProofEvents']('all');
            const result = events.map(item => {
                const tag = item.event.type
                return {
                    ...item,
                    tag
                }
            })
            if (!this.$store.getters.removeExpiredPositiveTestsWithPositiveTest) {
                // show all results, see #TAIGA-4532
                return result
            }
            return result.filter(({ event: { vaccination } }) => !!vaccination) // only show vaccinations, see #TAIGA-4607
        }
    }
})
</script>

<style lang="scss" scoped>
@import "@/styles/variables/sizes.scss";
.warning {
    margin-bottom: 2 * $grid-x2-5;
    background: #F3F5FE;
    border-color: #F3F5FE;
}
.link {
    display: block;
    padding-top: 1em;
}
</style>
