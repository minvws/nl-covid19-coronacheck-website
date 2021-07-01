<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Recovery from './Recovery';
import PositiveTest from './PositiveTest';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'

export default {
    name: 'RecoveryOverview',
    components: { PositiveTest, Page, PageIntro, Recovery, CcButton, CcModestButton },
    mixins: [overviewMixin],
    data() {
        return {
            filter: 'positivetest,recovery',
            pages: {
                print: 'PrintRecovery',
                noResultFromSigner: 'RecoveryNotPossible'
            }
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
                :head="$t('views.recoveryOverview.pageHeader')"
                :intro="$t('views.recoveryOverview.pageIntro')"/>
            <div class="section-block">
                <div class="proof-events">
                    <div
                        v-for="(signedEvent, index) in signedEvents"
                        :key="index"
                        class="proof-event__wrapper">
                        <Recovery
                            v-if="signedEvent.event.recovery"
                            :key="signedEvent.unique"
                            :signed-event="signedEvent"/>
                        <PositiveTest
                            v-if="signedEvent.event.positivetest"
                            :key="signedEvent.unique"
                            :signed-event="signedEvent"/>
                    </div>
                </div>
                <div class="section-block__footer">
                    <CcButton
                        @select="gotoPrint()"
                        :label="$t('views.VaccinationOverview.createTestProofButton')"/>
                    <div class="button__help-button">
                        <CcModestButton
                            @select="openModalSomethingWrong()"
                            :label="$t('somethingIsWrong')"/>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>
