<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import redirectMixin from '@/components/views/3-collect/_shared/redirect-mixin'
import { FilterTypes } from '@/types/filter-types'
import { ProviderTypes } from '@/types/provider-types'
import { events as StorageEvent } from '@/store/modules/storage'
import { RouterNames } from '@/qr/router'
import { FlowTypes } from '@/types/flow-types';

export default {
    name: 'VaccinationRedirect',
    components: { Page, PageIntro, Loading },
    mixins: [redirectMixin],
    props: {
        auth: {
            type: String,
            required: true
        }
    },
    data() {
        const isWithPositiveTest = this.$store.getters[StorageEvent.WITH_POSITIVE_TEST]
        const positiveTest = 'CollectPositiveTest'
        const overview = this.$store.getters.isListBeforeOverview ? RouterNames.VACCINATION_OVERVIEW_LIST : 'vaccinationOverview'
        return {
            isLoading: false,
            filter: FilterTypes.VACCINATION,
            eventProviders: ProviderTypes.ANY_PROVIDER,
            flow: FlowTypes.VACCINATION,
            isWithPositiveTest,
            pages: {
                cancel: 'ChoiceProof',
                previous: 'CollectVaccination',
                overview: isWithPositiveTest ? positiveTest : overview,
                noResult: 'VaccinationsNone'
            }
        }
    }
}
</script>

<template>
    <Page
        class="NegativeTestRedirect"
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.proofsOverviewList.pageHeader')"/>
            <div
                v-if="isLoading"
                class="section-block">
                <Loading/>
            </div>
        </div>
    </Page>
</template>

<style lang="scss" scoped>

    .mock-choices {
        width: 100%;
    }
    button {
        background: #ddd;
        padding: 8px;
        cursor: pointer;
        margin: 10px;

        &:hover {
            background: pink;
        }
    }
</style>
