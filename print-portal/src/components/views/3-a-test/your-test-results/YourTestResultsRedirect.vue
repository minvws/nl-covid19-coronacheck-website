<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import signedEventsTool from '@/tools/signed-events'
// import { cmsDecode } from '@/tools/cms'

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
        completeAuthentication() {
            this.isLoading = true;
            const confirmAction = () => {
                this.$router.push({ name: 'Home' });
            }

            this.authVaccinations.completeAuthentication().then((user) => {
                // after redirect we've lost the consent
                this.$store.commit('setUserConsent', true);
                this.collectEvents(user.id_token)
            }).catch(() => {
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.info.digidCanceled.head'),
                    messageBody: this.$t('message.info.digidCanceled.body'),
                    confirm: true,
                    confirmAction,
                    confirmYes: this.$t('goBackToStart'),
                    confirmNo: this.$t('close')
                })
            })
        },
        collectEvents(token) {
            this.$store.commit('signedEvents/clear');
            this.isLoading = true;
            signedEventsTool.collect(token, 'negativetest').then(signedEvents => {
                this.$store.commit('signedEvents/createAll', signedEvents);
                this.isLoading = false;

                const negativeTestSignedEvents = this.$store.getters['signedEvents/getProofEvents']('negativetest');
                if (negativeTestSignedEvents.length > 0) {
                    this.$router.push({ name: 'YourTestResult', params: { flow: '3.0' } });
                } else {
                    this.$router.push({ name: 'TestResultNone' });
                }
                // todo
                // this.$router.push({ name: 'TestResultPending' });
                // this.$router.push({ name: 'TestResultNotPossible' });
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
