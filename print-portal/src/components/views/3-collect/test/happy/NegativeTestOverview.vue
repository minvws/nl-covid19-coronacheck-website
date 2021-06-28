<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import NegativeTest from './NegativeTest';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'

export default {
    name: 'NegativeTestOverview',
    components: { Page, PageIntro, NegativeTest, CcButton, CcModestButton },
    mixins: [overviewMixin],
    data() {
        return {
            filter: 'negativetest',
            pages: {
                print: 'PrintNegativeTest',
                domesticRejected: ''
            }
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
                :head="$t('views.NegativeTestOverview.pageHeader')"
                :intro="$t('views.NegativeTestOverview.pageIntro')"/>

            <div class="section-block">
                <div class="proof-events">
                    <NegativeTest
                        :signed-event="latestSignedEvent"/>
                </div>
                <div class="section-block__footer">
                    <CcButton
                        @select="gotoPrint()"
                        :label="$t('views.NegativeTestOverview.createTestProofButton')"/>
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
