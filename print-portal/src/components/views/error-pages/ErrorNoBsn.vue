<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { goHome } from '@/tools/router';

export default {
    name: 'ErrorNoBsn',
    components: { Page, PageIntro, CcButton },
    methods: {
        goHome() {
            goHome();
        }
    }
}
</script>

<template>
    <Page
        :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.errorNoBsn.pageHeader')"
                :intro="$t('views.errorNoBsn.pageIntro')"/>
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
