<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import NegativeTest from './NegativeTest';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'
import NegativeTestV2 from './NegativeTestV2';
import LoadingCover from '@/components/elements/LoadingCover';
import { FilterTypes } from '@/types/filter-types'

export default {
    name: 'NegativeTestOverview',
    components: { LoadingCover, NegativeTestV2, Page, PageIntro, NegativeTest, CcButton, CcModestButton },
    mixins: [overviewMixin],
    props: {
        filter: {
            type: String,
            required: false,
            default: FilterTypes.NEGATIVE_TEST
        }
    },
    data() {
        return {
            pages: {
                print: 'PrintNegativeTest'
            }
        }
    },
    methods: {
        translate (id) {
            const key = 'views.negativeTestOverview'
            return this.$t(`${key}.${id}`);
        }
    },
    mounted() {
        if (!this.latestSignedEvent) {
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
                <div class="proof-events" v-if="latestSignedEvent">
                    <NegativeTestV2
                        v-if="latestSignedEvent.event.negativetest.protocolVersion === '2.0'"
                        :signed-event="latestSignedEvent"/>
                    <NegativeTest
                        v-else
                        :signed-event="latestSignedEvent"/>
                </div>
                <div class="section-block__footer">
                    <CcButton
                        id="create-qr-negative-test"
                        @select="gotoPrint()"
                        :label="translate('createTestProofButton')"/>
                    <div
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
