<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import redirectMixin from '@/components/views/3-collect/_shared/redirect-mixin'
export default {
    name: 'CollectPositiveTest',
    components: { Page, PageIntro, Loading },
    mixins: [redirectMixin],
    data() {
        return {
            isLoading: false,
            filter: 'positivetest,recovery',
            eventProviders: 'GGD',
            pages: {
                cancel: 'ChoiceProof',
                previous: 'CollectRecovery',
                overview: 'RecoveryOverview',
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
