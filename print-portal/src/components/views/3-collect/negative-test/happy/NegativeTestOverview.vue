<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import NegativeTest from './NegativeTest';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'
import NegativeTestV2 from './NegativeTestV2';
import VaccinationAssessment from '@/components/views/5-short-stay/VaccinationAssessment';

import LoadingCover from '@/components/elements/LoadingCover';
import { FilterTypes } from '@/types/filter-types'
import { RouterNames } from '@/router/pages/short-stay'

export default {
    name: 'NegativeTestOverview',
    components: { LoadingCover, NegativeTestV2, Page, PageIntro, NegativeTest, CcButton, CcModestButton, VaccinationAssessment },
    mixins: [overviewMixin],
    props: {
        filter: {
            type: String,
            required: false,
            default: FilterTypes.NEGATIVE_TEST
        },
        exclude: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            pages: {
                print: 'PrintNegativeTest'
            }
        }
    },
    computed: {
        isAssessment () {
            return this.filter === FilterTypes.VACCINATION_ASSESSMENT
        },
        assessmentEvent () {
            return this.$store.getters['signedEvents/getProofEvents'](FilterTypes.VACCINATION_ASSESSMENT)?.[0]
        },
        translation () {
            return this.exclude || 'negativeTestOverview'
        }
    },
    methods: {
        translate (id) {
            const key = `views.${this.translation}`
            return this.$t(`${key}.${id}`);
        }
    },
    mounted() {
        if (this.isAssessment) {
            this.$router.replace({ name: RouterNames.CODE });
        } else if (!this.latestSignedEvent) {
            this.$router.push({ name: 'TestResultNone' });
        }
    }
}
</script>

<template>
    <Page
        @back="back"
        class="NegativeTestOverview">
        <div class="section">
            <PageIntro
                :head="translate('pageHeader')"
                :intro="translate('pageIntro')"/>

            <div class="section-block">
                <div class="proof-events" v-if="!isAssessment && latestSignedEvent">
                    <VaccinationAssessment
                        v-if="assessmentEvent"
                        :signed-event="assessmentEvent"
                    />
                    <NegativeTestV2
                        v-if="latestSignedEvent.event.negativetest.protocolVersion === '2.0'"
                        :signed-event="latestSignedEvent"/>
                    <NegativeTest
                        v-else
                        :footer="exclude"
                        :signed-event="latestSignedEvent"/>
                </div>
                <div class="section-block__footer">
                    <CcButton
                        id="create-qr-negative-test"
                        @select="gotoPrint()"
                        :label="translate('createTestProofButton')"/>
                    <div
                        v-if="!assessmentEvent"
                        class="button__help-button">
                        <CcModestButton
                            id="something-is-wrong"
                            @select="openModalSomethingWrong()"
                            :label="$t('somethingIsWrong')"/>
                    </div>
                </div>
            </div>
            <LoadingCover v-if="proofSubmitted"/>
        </div>
    </Page>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.NegativeTestOverview {

    .NegativeTestOverview__header {
        position: relative;
        margin: $length-l 0 $grid-x2 0;
        font-weight: 700;
    }

    .NegativeTestOverview__footer {
        margin-top: 70px;
    }
}
</style>
