<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'
import vaccinationOverviewMixin from '@/components/views/3-collect/_shared/vaccination-overview-mixin'
import LoadingCover from '@/components/elements/LoadingCover';
import { FilterTypes } from '@/types/filter-types'
import ProofEvents from '@/components/views/4-print/ProofEvents.vue';

export default {
    name: 'VaccinationOverview',
    components: { LoadingCover, Page, PageIntro, CcButton, CcModestButton, ProofEvents },
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
        @back="$router.go(-1)">
        <div class="section">
            <PageIntro
                :head="$t('views.vaccinationOverview.pageHeader')"
                :intro="$t('views.vaccinationOverview.pageIntro')"/>
            <div class="section-block">
                <ProofEvents />
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
