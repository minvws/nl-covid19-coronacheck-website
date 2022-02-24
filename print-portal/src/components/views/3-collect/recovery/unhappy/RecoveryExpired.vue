<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { goHome } from '@/tools/router';

export default {
    name: 'RecoveryExpired',
    components: { Page, PageIntro, CcButton },
    computed: {
        recoveryEventValidityDays() {
            return this.$store.getters.getRecoveryEventValidityDays();
        }
    },
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
                :head="$t('views.recoveryExpired.pageHeader')"
                :intro="$t('views.recoveryExpired.pageIntro', { days: this.recoveryEventValidityDays })"/>
            <div class="section-block">
                <CcButton
                    @select="goHome()"
                    :label="$t('goBackToStart')"/>
            </div>
        </div>
    </Page>
</template>
