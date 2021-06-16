<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import redirectMixin from './redirect-mixin'

export default {
    name: 'YourTestResultsRedirect',
    components: { Page, PageIntro, Loading },
    mixins: [redirectMixin],
    data() {
        return {
            isLoading: false,
            type: 'negativetest'
        }
    },
    computed: {},
    methods: {
        back() {
            const callback = () => {
                // todo cancel all processes
                this.$store.commit('signedEvents/clear');
                this.$router.push({ name: 'ChoiceProof' });
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
                this.$store.commit('signedEvents/clear');
                this.$router.push({ name: 'ChoiceProof' });
            }
        },
        checkResult() {
            const negativeTestSignedEvents = this.$store.getters['signedEvents/getProofEvents']('negativetest');
            if (negativeTestSignedEvents.length > 0) {
                this.$router.push({ name: 'YourTestResult', params: { flow: '3.0' } });
            } else {
                this.$router.push({ name: 'TestResultNone' });
            }
            // todo
            // this.$router.push({ name: 'TestResultPending' });
            // this.$router.push({ name: 'TestResultNotPossible' });
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
                <Loading
                    :text="'(Mocking digid connection...)'"/>
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
