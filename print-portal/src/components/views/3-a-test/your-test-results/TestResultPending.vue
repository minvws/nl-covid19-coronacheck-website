<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'TestResultPending',
    components: { Page, PageIntro },
    computed: {},
    methods: {
        goBack() {
            this.$router.push({ name: 'ProvideCode' });
        }
    }
}
</script>

<template>
    <Page :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.testResultPending.pageHeader')"
                :intro="$t('views.testResultPending.pageIntro')"/>
            <div class="section-block">
                <div class="section-block__footer">
                    <button
                        @click="goBack()"
                        :to="{ name: 'ProvideCode' }"
                        type="button"
                        class="btn">
                        {{$t('back')}}
                    </button>
                </div>
            </div>
        </div>
    </Page>
</template>
