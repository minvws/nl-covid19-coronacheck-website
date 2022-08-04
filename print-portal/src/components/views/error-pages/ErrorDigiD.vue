<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import ErrorList from '@/components/elements/ErrorList.vue';
import { goHome } from '@/tools/router';

export default {
    name: 'ErrorDigiD',
    components: { Page, PageIntro, CcButton, ErrorList },
    methods: {
        goHome() {
            goHome();
        }
    },
    computed: {
        errors() {
            const errors = this.$route.query.error ? [this.$route.query.error] : []
            return errors.length ? errors : undefined
        }
    }
}
</script>

<template>
    <Page
        :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.errorDigiD.pageHeader')"
                :intro="$t('views.errorDigiD.pageIntro')">
                 <ErrorList v-if="errors" :errors="errors" />
            </PageIntro>
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
