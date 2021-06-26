<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Recovery from './Recovery';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'

export default {
    name: 'RecoveryOverview',
    components: { Page, PageIntro, Recovery, CcButton, CcModestButton },
    mixins: [overviewMixin],
    data() {
        return {
            type: 'recovery',
            pages: {
                print: 'PrintRecovery',
                domesticRejected: '' // todo
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
                :head="$t('views.RecoveryOverview.pageHeader')"
                :intro="$t('views.RecoveryOverview.pageIntro')"/>
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
                            @select="openModalSomethingWrong()"
                            :label="$t('somethingIsWrong')"/>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>
