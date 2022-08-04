<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import ErrorList from '@/components/elements/ErrorList.vue';
import { goHome } from '@/tools/router';

export default {
    name: 'ErrorGeneral',
    components: { Page, PageIntro, CcButton, ErrorList },
    methods: {
        goHome() {
            goHome();
        }
    },
    computed: {
        errors() {
            const errors = this.$route.query?.errors?.split('+') ?? []
            return errors.length ? errors : undefined
        },
        link () {
            const link = this.$t('views.errorGeneral.link')
            return link
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
                :intro="$t('views.errorGeneral.pageIntro')">
                <ErrorList v-if="errors" :errors="errors" />
                <template v-if="link">
                    <br v-if="errors" />
                    <div v-html="link" />
                    <br>
                </template>
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
