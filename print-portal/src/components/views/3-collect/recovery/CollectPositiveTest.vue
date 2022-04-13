<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import redirectMixin from '@/components/views/3-collect/_shared/redirect-mixin'
import { FilterTypes, FilterScopes } from '@/types/filter-types'
import { ProviderTypes } from '@/types/provider-types'
import { RouterNames } from '@/qr/router'

export default {
    name: 'CollectPositiveTest',
    components: { Page, PageIntro, Loading },
    mixins: [redirectMixin],
    data() {
        const overview = this.$store.getters.isListBeforeOverview ? RouterNames.RECOVERY_OVERVIEW_LIST : 'RecoveryOverview'
        return {
            isLoading: false,
            filter: [FilterTypes.POSITIVE_TEST, FilterTypes.RECOVERY].join(','),
            scope: FilterScopes.FIRST_EPISODE,
            eventProviders: ProviderTypes.ANY_PROVIDER,
            pages: {
                cancel: 'ChoiceProof',
                previous: 'CollectRecovery',
                overview,
                noResult: 'RecoveryNone'
            }
        }
    }
}
</script>

<template>
    <Page>
        <div class="section">
            <PageIntro
                :head="$t('views.collectPositiveTest.pageHeader')"/>
            <div class="section-block">
                 <div class="section-block__footer">
                     <Loading />
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
