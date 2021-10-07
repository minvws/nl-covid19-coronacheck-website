<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { goHome } from '@/tools/router';

export default {
    name: 'ErrorNoEvents',
    components: { Page, PageIntro, CcButton },
    methods: {
        goHome() {
            goHome();
        }
    },
    computed: {
        errors() {
            if (this.$route.query.errors) {
                return this.$route.query.errors.split('+').join('\n');
            } else {
                return [];
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
                :intro="$t('views.errorNoEvents.pageIntro', { errors: errors })"/>
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
