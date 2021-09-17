<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'ServerBusy',
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
                :head="$t('views.serverBusy.pageHeader')"
                :intro="$t('views.serverBusy.pageIntro', { error: $route.query.error })"/>
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
