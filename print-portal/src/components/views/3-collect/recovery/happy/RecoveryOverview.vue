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
    name: 'RecoveryOverview',
    components: { LoadingCover, Page, PageIntro, CcButton, CcModestButton, ProofEvents },
    mixins: [overviewMixin, vaccinationOverviewMixin],
    data() {
        return {
            filter: [FilterTypes.POSITIVE_TEST, FilterTypes.RECOVERY].join(','),
            pages: {
                print: 'PrintRecovery'
            }
        }
    },
    methods: {
        onBack () {
            if (this.withPositiveTestFlow) this.$router.go(-1)
            else this.back()
        }
    }
}
</script>

<template>
    <Page
        class="VaccinationOverview"
        @back="onBack">
        <div class="section">
            <PageIntro
                :head="$t('views.recoveryOverview.pageHeader')"
                :intro="$t('views.recoveryOverview.pageIntro')"/>
            <div class="section-block">
                <ProofEvents />
                <div class="section-block__footer">
                    <CcButton
                        id="create-qr-recovery"
                        @select="gotoPrint()"
                        :label="$t('views.recoveryOverview.createTestProofButton')"/>

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

<style lang="scss" scoped>
@import "@/styles/variables/sizes.scss";
.warning {
    margin-bottom: 2 * $grid-x2-5;
    background: #F3F5FE;
    border-color: #F3F5FE;
}
</style>
