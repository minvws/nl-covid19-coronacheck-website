<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import redirectMixin from '@/components/views/3-collect/_shared/redirect-mixin'

export default {
    name: 'VaccinationRedirect',
    components: { Page, PageIntro, Loading },
    mixins: [redirectMixin],
    data() {
        return {
            isLoading: false,
            type: 'vaccination'
        }
    },
    computed: {},
    methods: {
        back() {
            const callback = () => {
                if (this.isLoading) {
                    // todo cancel all processes
                }
                this.$store.commit('clearAll')
                this.$store.commit('signedEvents/clear')
                this.$router.push({ name: 'ChoiceProof' });
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.areYouSureToCancelVaccination.head'),
                messageBody: this.$t('message.info.areYouSureToCancelVaccination.body'),
                confirm: true,
                confirmAction: callback,
                confirmYes: this.$t('message.info.areYouSureToCancelVaccination.yes'),
                confirmNo: this.$t('message.info.areYouSureToCancelVaccination.no'),
                closeButton: false
            })
        },
        gotoPreviousPage() {
            this.$store.commit('snackbar/close');
            this.$router.push({ name: 'CollectVaccination' });
        },
        checkResult() {
            const vaccinationSignedEvents = this.$store.getters['signedEvents/getProofEvents']('vaccination');
            if (vaccinationSignedEvents.length > 0) {
                this.$router.push({ name: 'VaccinationOverview' });
            } else {
                this.$router.push({ name: 'VaccinationsNone' });
            }
            // todo
            // this.$router.push({ name: 'VaccinationsNotPossible' });
        }
    }
}
</script>

<template>
    <Page
        class="NegativeTestRedirect"
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.VaccinationOverview.pageHeader')"/>
            <div
                v-if="isLoading"
                class="section-block">
                <Loading/>
            </div>
        </div>
    </Page>
</template>

<style lang="scss" scoped>

    .mock-choices {
        width: 100%;
    }
    button {
        background: #ddd;
        padding: 8px;
        cursor: pointer;
        margin: 10px;

        &:hover {
            background: pink;
        }
    }
</style>
