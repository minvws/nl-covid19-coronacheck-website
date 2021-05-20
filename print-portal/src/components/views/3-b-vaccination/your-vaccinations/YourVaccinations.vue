<script>
import Page from '@/components/elements/Page';
import Loading from '@/components/elements/Loading';
import mockData from '@/data/mock/data';
import Vaccination from './Vaccination';

export default {
    name: 'YourVaccinations',
    components: { Vaccination, Loading, Page },
    data() {
        return {
            isLoading: true,
            accessToken: ''
        }
    },
    computed: {
        vaccinationProofEvents() {
            return this.$store.getters['proofEvents/getProofEvents']('vaccination');
        }
    },
    methods: {
        back() {
            const callback = () => {
                // todo cancel all processes
                console.log('cancelling processes');
                this.$router.push({ name: 'CollectVaccination' });
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
                this.$router.push({ name: 'CollectVaccination' });
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
            setTimeout(this.retrieveResults, 100);
        },
        retrieveResults() {
            const result = mockData;
            this.$store.commit('updateHolder', result.holder);
            for (const proofEvent of result.events) {
                this.$store.commit('proofEvents/create', proofEvent);
            }
            this.isLoading = false;
        },
        gotoPrint() {
            this.$router.push({ name: 'PrintVaccination' });
        },
        openModalVaccinationSomethingWrong() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('somethingIsWrong'),
                messageBody: this.$t('message.info.vaccinationSomethingWrong.body'),
                closeButton: true
            })
        }
    },
    mounted() {
        this.readToken();
    }
}
</script>

<template>
    <Page
        class="YourVaccinations"
        @back="back">
        <div class="section">
            <div class="section-block">
                <h2>
                    {{$t('views.yourVaccinations.pageHeader')}}
                </h2>
                <div
                    v-if="!isLoading"
                    v-html="$t('views.yourVaccinations.pageIntro')"/>
            </div>
            <div
                v-if="isLoading"
                class="section-block">
                <Loading
                    :text="'(Mocking digid connection...)'"/>
            </div>
            <div
                v-else
                class="section-block">
                <div class="proof-events">
                    <Vaccination
                        v-for="proofEvent of vaccinationProofEvents"
                        :key="proofEvent.unique"
                        :proof-event="proofEvent"/>
                </div>
                <div class="section-block__footer">
                    <button
                        @click="gotoPrint()"
                        type="button"
                        class="btn">
                        {{$t('createTestProof')}}
                    </button>
                    <div class="button__help-button">
                        <button
                            @click="openModalVaccinationSomethingWrong()"
                            type="button"
                            class="button-modest">
                            {{$t('somethingIsWrong')}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
.YourVaccinations {
}
</style>
