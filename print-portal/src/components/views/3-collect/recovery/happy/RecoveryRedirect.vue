<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import redirectMixin from '@/components/views/3-collect/_shared/redirect-mixin'
import { FilterTypes, FilterScopes } from '@/types/filter-types'
import { ProviderTypes } from '@/types/provider-types'
import { RouterNames } from '@/qr/router'
import { FlowTypes } from '@/types/flow-types';
export default {
    name: 'RecoveryRedirect',
    components: { Page, PageIntro, Loading },
    mixins: [redirectMixin],
    data() {
        return {
            isLoading: false,
            filter: [FilterTypes.POSITIVE_TEST, FilterTypes.RECOVERY].join(','),
            scope: FilterScopes.RECOVERY,
            eventProviders: ProviderTypes.ANY_PROVIDER,
            flow: FlowTypes.RECOVERY,
            pages: {
                cancel: 'ChoiceProof',
                previous: 'CollectRecovery',
                overview: RouterNames.RECOVERY_OVERVIEW,
                noResult: 'RecoveryNone'
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
                :head="$t('views.recoveryOverview.pageHeader')"/>
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
