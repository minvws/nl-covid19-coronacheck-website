<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import { goHome } from '@/tools/router';
import VaccinationAssessment from '@/components/views/5-short-stay/VaccinationAssessment';
import NegativeTestV2 from '@/components/views/3-collect/negative-test/happy/NegativeTestV2';
import NegativeTest from '@/components/views/3-collect/negative-test/happy/NegativeTest';
import overviewMixin from '@/components/views/3-collect/_shared/overview-mixin'
import { FilterTypes } from '@/types/filter-types'

export default {
    name: 'ErrorCode99552',
    props: {
        filter: {
            type: String,
            required: true
        }
    },

    mixins: [overviewMixin],
    components: { Page, PageIntro, VaccinationAssessment, NegativeTestV2, NegativeTest },
    computed: {
        assessmentEvent () {
            return this.$store.getters['signedEvents/getProofEvents'](FilterTypes.VACCINATION_ASSESSMENT)?.[0]
        }
    },
    methods: {
        goHome() {
            goHome();
        }
    },
    created () {
        if (this.assessmentEvent && this.latestSignedEvent) return
        // when this page is hard refreshed, no events are available, show general error page
        this.$router.replace({ name: 'ErrorGeneral', params: this.$route.params })
    }
}
</script>

<template>
    <Page
        @back="$router.go(-1)">
        <div class="section">
            <PageIntro
                :head="$t('views.errorCode99552.pageHeader')"
                :intro="$t('views.errorCode99552.pageIntro')"/>
            <div class="section-block" v-if="latestSignedEvent">
                <div class="section-block__footer">
                    <VaccinationAssessment
                        :signed-event="assessmentEvent"
                    />
                    <NegativeTestV2
                        v-if="latestSignedEvent.event.negativetest.protocolVersion === '2.0'"
                        :signed-event="latestSignedEvent"/>
                    <NegativeTest
                        v-else
                        :signed-event="latestSignedEvent"/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss" scoped>
.section-block__footer {
    padding-top: 8px;
}
</style>
