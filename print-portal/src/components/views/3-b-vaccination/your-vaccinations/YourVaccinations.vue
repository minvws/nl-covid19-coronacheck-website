<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import mockData from '@/data/mock/data';
import Vaccination from './Vaccination';

export default {
    name: 'YourVaccinations',
    components: { Page, PageIntro, Loading, Vaccination },
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
                if (this.isLoading) {
                    // todo cancel all processes
                    console.log('cancelling processes');
                }
                this.$store.commit('clearAll')
                this.$store.commit('proofEvents/clear')
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
            setTimeout(this.retrieveResults, 2000);
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
                messageHead: this.$t('message.info.vaccinationSomethingWrong.head'),
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
            <PageIntro
                :head="$t('views.yourVaccinations.pageHeader')"
                :intro="$t('views.yourVaccinations.pageIntro')"/>
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
                        {{$t('views.yourVaccinations.createTestProofButton')}}
                    </button>
                    <div class="button__help-button">
                        <button
                            @click="openModalVaccinationSomethingWrong()"
                            type="button"
                            class="button-modest">
                            {{$t('views.yourVaccinations.somethingIsWrong')}}
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
