<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Recovery from './Recovery';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import signer from '@/interfaces/signer';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'
import { handleRejectionSigner } from '@/tools/error-handler';

export default {
    name: 'RecoveryOverview',
    components: { Page, PageIntro, Recovery, CcButton, CcModestButton },
    mixins: [overviewMixin],
    data() {
        return {
            type: 'recovery'
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
                        :key="latestSignedEvent.unique"
                        :signed-event="latestSignedEvent"/>
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
