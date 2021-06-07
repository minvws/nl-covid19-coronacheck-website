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
                this.$router.push({ name: 'CollectVaccination' });
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
        readToken() {
            let params = decodeURI(window.location.hash);
            if (params[0] === '#') {
                params = params.substring(1)
            }
            this.accessToken = new URLSearchParams(params).get('access_token');
            this.$store.commit('setUserConsent', true);
            // mock connection
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        getResult(event) {
            this.$store.commit('signedEvents/clear');
            switch (event) {
            case 'test-bsn':
                this.isLoading = true;
                signedEventsTool.collect().then(signedEvents => {
                    this.$store.commit('signedEvents/createAll', signedEvents);
                    this.isLoading = false;
                    this.$router.push({ name: 'YourVaccinations' });
                });
                break;
            case 'not-possible':
                this.$router.push({ name: 'VaccinationsNotPossible' });
                break;
            case 'no-vaccinations':
                this.$router.push({ name: 'VaccinationsNone' });
                break;
            }
        }
    },
    mounted() {
        this.readToken();
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
                <Loading
                    :text="'(Mocking digid connection...)'"/>
            </div>
            <div v-else class="mock-choices">
                Mocking the result, options:<br><br>
                <button
                    @click="getResult('test-bsn')">Use test BSN</button>

                <button
                    @click="getResult('not-possible')">Not possible</button>

                <button
                    @click="getResult('no-vaccinations')">No vaccinations</button>
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
