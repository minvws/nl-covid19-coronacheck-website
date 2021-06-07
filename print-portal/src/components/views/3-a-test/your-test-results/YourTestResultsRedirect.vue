<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import mockData from '@/data/mock/data';
import HolderV3 from '@/classes/holder/HolderV3';
import signedEventsTool from '@/tools/signed-events'

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
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        getResult(event) {
            const result = mockData;
            this.$store.commit('proofEvents/clear');
            switch (event) {
            case 'negative':
                this.$store.commit('updateHolder', new HolderV3(result.holder));
                for (const proofEvent of result.events) {
                    this.$store.commit('proofEvents/create', proofEvent);
                }
                this.$router.push({ name: 'YourTestResult', params: { flow: '3.0' } });
                break;
            case 'none':
                this.$router.push({ name: 'TestResultNone' });
                break;
            case 'pending':
                this.$router.push({ name: 'TestResultPending' });
                break;
            case 'not-possible':
                this.$router.push({ name: 'TestResultNotPossible' });
                break;
            case 'test-bsn':
                this.isLoading = true;
                signedEventsTool.collect().then(signedEvents => {
                    this.$store.commit('signedEvents/createAll', signedEvents);
                    this.isLoading = false;
                    this.$router.push({ name: 'YourTestResult', params: { flow: '3.0' } });
                });
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
                    @click="getResult('negative')">Negative</button>

                <button
                    @click="getResult('none')">None</button>

                <button
                    @click="getResult('pending')">Pending</button>

                <button
                    @click="getResult('not-possible')">Not possible</button>
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
