<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'TestResultNotPossible',
    components: { Page, PageIntro, CcButton },
    methods: {
        goHome() {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>

<template>
    <Page
        :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.testResultNotPossible.pageHeader')"
                :intro="$t('views.testResultNotPossible.pageIntro')"/>
            <div class="section-block">
                <div class="section-block__footer">
                    <CcButton
                        @select="goHome()"
                        :label="$t('goBackToStart')"/>
                </div>
            </div>
        </div>
    </Page>
</template>
