<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Vaccination from './Vaccination';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import signer from '@/interfaces/signer';
import dateTool from '@/tools/date';
import { handleRejection } from '@/tools/error-handler';

export default {
    name: 'YourVaccinations',
    components: { Page, PageIntro, Vaccination, CcButton, CcModestButton },
    computed: {
        vaccinationSignedEvents() {
            const vaccinationSignedEvents = this.$store.getters['signedEvents/getProofEvents']('vaccination');
            const filteredForUnique = []
            for (const signedEvent of vaccinationSignedEvents) {
                const existingKeys = filteredForUnique.map(s => s.event.unique);
                if (existingKeys.indexOf(signedEvent.event.unique) === -1) {
                    filteredForUnique.push(signedEvent)
                }
            }
            return filteredForUnique.sort((a, b) => {
                return dateTool.getTime(a.event.vaccination.date) - dateTool.getTime(b.event.vaccination.date);
            })
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
            this.$store.commit('snackbar/close');
        },
        gotoPrint() {
            if (this.$store.state.qrs.proof === null) {
                signer.sign(this.$store.state.signedEvents.all).then(response => {
                    this.$store.commit('qrs/add', response.data);
                    this.$router.push({ name: 'PrintVaccination' });
                }).catch(error => {
                    handleRejection(error);
                })
            } else {
                this.$router.push({ name: 'PrintVaccination' });
            }
            this.$store.commit('snackbar/close');
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
