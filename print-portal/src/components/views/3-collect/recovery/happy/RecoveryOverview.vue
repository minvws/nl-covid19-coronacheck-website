<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Recovery from './Recovery';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import signer from '@/interfaces/signer';
import dateTool from '@/tools/date';
import { handleRejectionSigner } from '@/tools/error-handler';

export default {
    name: 'RecoveryOverview',
    components: { Page, PageIntro, Recovery, CcButton, CcModestButton },
    computed: {
        // todo make DRY with vaccination
        recoverySignedEvents() {
            const signedEvents = this.$store.getters['signedEvents/getProofEvents']('recovery');
            const filteredForUnique = []
            for (const signedEvent of signedEvents) {
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
            // const callback = () => {
            //     this.$store.commit('clearAll')
            //     this.$router.push({ name: 'ChoiceProof' });
            // }
            // todo
            // this.$store.commit('modal/set', {
            //     messageHead: this.$t('message.info.areYouSureToCancelVaccination.head'),
            //     messageBody: this.$t('message.info.areYouSureToCancelVaccination.body'),
            //     confirm: true,
            //     confirmAction: callback,
            //     confirmYes: this.$t('message.info.areYouSureToCancelVaccination.yes'),
            //     confirmNo: this.$t('message.info.areYouSureToCancelVaccination.no'),
            //     closeButton: false,
            //     confirmAlert: true
            // })
            this.$store.commit('snackbar/close');
        },
        gotoPrint() {
            if (this.$store.state.qrs.proof === null) {
                signer.sign(this.$store.state.signedEvents.all).then(response => {
                    // currently check if there is domestic result. From 2.1 on
                    // we have to check if there is either domestic or eu
                    if (response.data) {
                        if (response.data.domestic) {
                            this.$store.commit('qrs/add', response.data);
                            this.$router.push({ name: 'PrintRecovery' });
                        } else {
                            // todo ?
                        }
                    }
                }).catch(error => {
                    handleRejectionSigner(error);
                })
            } else {
                this.$router.push({ name: 'PrintRecovery' });
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
        class="VaccinationOverview"
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.VaccinationOverview.pageHeader')"
                :intro="$t('views.VaccinationOverview.pageIntro')"/>
            <div class="section-block">
                <div class="proof-events">
                    <Recovery
                        v-for="signedEvent of recoverySignedEvents"
                        :key="signedEvent.unique"
                        :signed-event="signedEvent"/>
                </div>
                <div class="section-block__footer">
                    <CcButton
                        @select="gotoPrint()"
                        :label="$t('views.VaccinationOverview.createTestProofButton')"/>
                    <div class="button__help-button">
                        <CcModestButton
                            @select="openModalVaccinationSomethingWrong()"
                            :label="$t('views.VaccinationOverview.somethingIsWrong')"/>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>
