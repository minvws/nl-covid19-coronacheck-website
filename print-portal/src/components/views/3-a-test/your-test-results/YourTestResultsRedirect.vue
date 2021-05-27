<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import mockData from '@/data/mock/data';

export default {
    name: 'YourTestResultsRedirect',
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
                // todo cancel all processes
                console.log('cancelling processes');
                this.$router.push({ name: 'ChoiceTestLocation' });
            }
            if (this.isLoading) {
                this.$store.commit('modal/set', {
                    messageHead: 'Cancel',
                    messageBody: 'weet je het zeker?',
                    confirm: true,
                    confirmAction: callback,
                    confirmYes: this.$t('yes'),
                    confirmNo: this.$t('no'),
                    closeButton: false
                })
            } else {
                this.$router.push({ name: 'ChoiceTestLocation' });
            }
        },
        readToken() {
            let params = decodeURI(window.location.hash);
            if (params[0] === '#') {
                params = params.substring(1)
            }
            this.accessToken = new URLSearchParams(params).get('access_token');
            this.$store.commit('setUserConsent', true);
            // mock connection
            setTimeout(this.retrieveResults, 2000);
        },
        retrieveResults() {
            const result = mockData;
            this.$store.commit('updateHolder', result.holder);
            for (const proofEvent of result.events) {
                this.$store.commit('proofEvents/create', proofEvent);
            }
            this.isLoading = false;
            this.$router.push({ name: 'YourTestResult' });
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
        </div>
    </Page>
</template>

<style lang="scss"></style>
