<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Vaccination from './Vaccination';
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'YourVaccinations',
    components: { Page, PageIntro, Vaccination, CcButton },
    computed: {
        vaccinationSignedEvents() {
            return this.$store.getters['signedEvents/getProofEvents']('vaccination');
        }
    },
    methods: {
        back() {
            const callback = () => {
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
            <div class="section-block">
                <div class="proof-events">
                    <Vaccination
                        v-for="signedEvent of vaccinationSignedEvents"
                        :key="signedEvent.unique"
                        :signed-event="signedEvent"/>
                </div>
                <div class="section-block__footer">
                    <CcButton
                        @select="gotoPrint()"
                        :label="$t('views.yourVaccinations.createTestProofButton')"/>
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
