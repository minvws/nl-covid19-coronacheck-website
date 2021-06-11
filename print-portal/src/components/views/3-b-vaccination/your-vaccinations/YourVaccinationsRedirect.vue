<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import signedEventsTool from '@/tools/signed-events'

export default {
    name: 'YourVaccinationsRedirect',
    components: { Page, PageIntro, Loading },
    data() {
        return {
            isLoading: true,
            accessToken: ''
        }
    },
    computed: {},
    methods: {
        back() {
            const callback = () => {
                if (this.isLoading) {
                    // todo cancel all processes
                    console.log('cancelling processes');
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
        completeAuthentication() {
            this.isLoading = true;
            this.authVaccinations.completeAuthentication().then((user) => {
                this.collectEvents(user.id_token)
            }, () => {
                this.isLoading = false;
                this.$router.push({ name: 'CollectVaccination' });
            })
        },
        collectEvents(token) {
            this.$store.commit('signedEvents/clear');
            this.isLoading = true;
            signedEventsTool.collect(token).then(signedEvents => {
                this.$store.commit('signedEvents/createAll', signedEvents);
                this.isLoading = false;
                this.$router.push({ name: 'YourVaccinations' });
                // todo
                // this.$router.push({ name: 'VaccinationsNone' });
                // this.$router.push({ name: 'VaccinationsNotPossible' });
            }, (error) => {
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.error.general.head'),
                    messageBody: (this.$t('message.error.general.body') + '<p>' + error + '</p>'),
                    closeButton: true
                });
            });
        }
    },
    mounted() {
        this.completeAuthentication();
    }
}
</script>

<template>
    <Page
        class="YourTestResultsRedirect"
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.yourTestResults.pageHeader')"/>
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
