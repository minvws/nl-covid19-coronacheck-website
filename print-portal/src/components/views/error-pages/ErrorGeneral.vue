<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { goHome } from '@/tools/router';

export default {
    name: 'ErrorGeneral',
    components: { Page, PageIntro, CcButton },
    methods: {
        goHome() {
            goHome();
        }
    },
    computed: {
        errors() {
            if (this.$route.query.errors) {
                return '<ul class="ul--with-padding">' + this.$route.query.errors.split('+').map(e => '<li>' + e + '</li>').join('') + '</ul>';
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
                :head="$t('views.errorGeneral.pageHeader')"
                :intro="$t('views.errorGeneral.pageIntro', { errors: errors })"/>
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
