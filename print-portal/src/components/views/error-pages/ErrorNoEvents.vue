<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'ErrorNoEvents',
    components: { Page, PageIntro, CcButton },
    methods: {
        goHome() {
            this.$router.push({ name: 'Home' })
        }
    },
    computed: {
        type() {
            if (this.$route.query.type) {
                return this.$t('components.digid.proofType.' + this.$route.query.type)
            } else {
                return '';
            }
        }
    }
}
</script>

<template>
    <Page
        :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.errorNoEvents.pageHeader')"
                :intro="$t('views.errorNoEvents.pageIntro', { type: type })"/>
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
