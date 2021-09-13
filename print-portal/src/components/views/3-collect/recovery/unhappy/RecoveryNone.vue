<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { goHome } from '@/tools/router';

export default {
    name: 'RecoveryNone',
    components: { Page, PageIntro, CcButton },
    computed: {
        recoveryExpirationDays() {
            return this.$store.state.holderConfig.recoveryExpirationDays;
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
                :head="$t('views.recoveryNone.pageHeader')"
                :intro="$t('views.recoveryNone.pageIntro', { days: this.recoveryExpirationDays })"/>
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
