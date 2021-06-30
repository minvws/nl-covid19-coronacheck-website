<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Vaccination from './Vaccination';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'

export default {
    name: 'VaccinationOverview',
    components: { Page, PageIntro, Vaccination, CcButton, CcModestButton },
    mixins: [overviewMixin],
    data() {
        return {
            filter: 'vaccination',
            pages: {
                print: 'PrintVaccination',
                noResultFromSigner: 'VaccinationsIncomplete'
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
                :head="$t('views.VaccinationOverview.pageHeader')"
                :intro="$t('views.VaccinationOverview.pageIntro')"/>
            <div class="section-block">
                <div class="proof-events">
                    <Vaccination
                        v-for="signedEvent of signedEvents"
                        :key="signedEvent.unique"
                        :signed-event="signedEvent"/>
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
