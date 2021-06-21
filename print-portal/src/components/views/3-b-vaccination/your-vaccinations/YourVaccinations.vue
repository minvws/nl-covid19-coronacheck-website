<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Vaccination from './Vaccination';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
// import signer from '@/interfaces/signer';

export default {
    name: 'YourVaccinations',
    components: { Page, PageIntro, Vaccination, CcButton, CcModestButton },
    computed: {
        vaccinationSignedEvents() {
            return this.$store.getters['signedEvents/getProofEvents']('vaccination');
        }
    },
    methods: {
        back() {
            const callback = () => {
                this.$store.commit('clearAll')
                this.$router.push({ name: 'ChoiceProof' });
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.areYouSureToCancelVaccination.head'),
                messageBody: this.$t('message.info.areYouSureToCancelVaccination.body'),
                confirm: true,
                confirmAction: callback,
                confirmYes: this.$t('message.info.areYouSureToCancelVaccination.yes'),
                confirmNo: this.$t('message.info.areYouSureToCancelVaccination.no'),
                closeButton: false,
                confirmAlert: true
            })
        },
        gotoPrint() {
            // signer.sign(this.$store.state.signedEvents.all).then(response => {
            //     console.log(response);
            //     if (response.data.status === 'ok' && response.data.error === 0) {
            //         //
            //     } else {
            //         this.$store.commit('modal/set', {
            //             messageHead: this.$t('generalError'),
            //             messageBody: this.$t('generalErrorBody'),
            //             closeButton: true
            //         });
            //     }
            // }).catch(error => {
            //     this.$store.commit('modal/set', {
            //         messageHead: this.$t('generalError'),
            //         messageBody: this.$t('generalErrorBody') + '<p>' + error + '</p>',
            //         closeButton: true
            //     });
            // })
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
                        <CcModestButton
                            @select="openModalVaccinationSomethingWrong()"
                            :label="$t('views.yourVaccinations.somethingIsWrong')"/>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>
