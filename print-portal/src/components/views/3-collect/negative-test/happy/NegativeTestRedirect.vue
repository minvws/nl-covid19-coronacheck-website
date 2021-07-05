<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import redirectMixin from '@/components/views/3-collect/_shared/redirect-mixin'

export default {
    name: 'NegativeTestRedirect',
    components: { Page, PageIntro, Loading },
    mixins: [redirectMixin],
    data() {
        return {
            isLoading: false,
            filter: 'negativetest',
            eventProviders: 'GGD',
            pages: {
                cancel: 'ChoiceProof',
                previous: 'ChoiceTestLocation',
                overview: 'NegativeTestOverview',
                noResult: 'TestResultNone'
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
                :head="$t('views.negativeTestOverview.pageHeader')"/>
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
