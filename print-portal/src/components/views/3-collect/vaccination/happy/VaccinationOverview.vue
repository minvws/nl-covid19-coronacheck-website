<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Vaccination from './Vaccination';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'
import vaccinationOverviewMixin from '@/components/views/3-collect/_shared/vaccination-overview-mixin'
import LoadingCover from '@/components/elements/LoadingCover';
import { FilterTypes } from '@/types/filter-types'

export default {
    name: 'VaccinationOverview',
    components: { LoadingCover, Page, PageIntro, Vaccination, CcButton, CcModestButton },
    mixins: [overviewMixin, vaccinationOverviewMixin],
    data() {
        return {
            filter: FilterTypes.VACCINATION,
            pages: {
                print: 'PrintVaccination'
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
                :head="$t('views.vaccinationOverview.pageHeader')"
                :intro="$t('views.vaccinationOverview.pageIntro')"/>
            <div class="section-block">
                <div class="proof-events">
                    <Vaccination
                        v-for="signedEventSet of signedVaccinations"
                        :key="signedEventSet[0].unique"
                        :signed-event-set="signedEventSet"/>
                </div>
                <div class="section-block__footer">
                    <CcButton
                        id="create-qr-vaccination"
                        @select="gotoPrint()"
                        :label="$t('views.vaccinationOverview.createTestProofButton')"/>
                    <div class="button__help-button">
                        <CcModestButton
                            @select="openModalSomethingWrong()"
                            :label="$t('somethingIsWrong')"/>
                    </div>
                </div>
            </div>
            <LoadingCover v-if="proofSubmitted"/>
        </div>
    </Page>
</template>
