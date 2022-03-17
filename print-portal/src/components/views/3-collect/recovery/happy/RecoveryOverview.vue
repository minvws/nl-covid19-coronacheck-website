<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Recovery from './Recovery';
import PositiveTest from './PositiveTest';
import Vaccination from '@/components/views/3-collect/vaccination/happy/Vaccination';

import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import WarningMessage from '@/components/elements/WarningMessage';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'
import vaccinationOverviewMixin from '@/components/views/3-collect/_shared/vaccination-overview-mixin'
import LoadingCover from '@/components/elements/LoadingCover';
import uniqWith from 'lodash.uniqwith'
import isEqual from 'lodash.isequal'
import { FilterTypes } from '@/types/filter-types'

export default {
    name: 'RecoveryOverview',
    components: { LoadingCover, PositiveTest, Page, PageIntro, Recovery, CcButton, CcModestButton, WarningMessage, Vaccination },
    mixins: [overviewMixin, vaccinationOverviewMixin],
    props: {
        message: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            filter: [FilterTypes.POSITIVE_TEST, FilterTypes.RECOVERY].join(','),
            pages: {
                print: 'PrintRecovery'
            }
        }
    },
    computed: {
        uniqueSignedEvents () {
            // remove duplicate events
            return uniqWith(this.signedEvents, isEqual)
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
                    <Vaccination
                        v-for="signedEventSet of signedVaccinations"
                        :key="signedEventSet[0].unique"
                        :signed-event-set="signedEventSet"/>
                    <div
                        v-for="(signedEvent, index) in uniqueSignedEvents"
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
                     <WarningMessage
                        v-if="message"
                        class="warning"
                        :message="message"
                    />
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
