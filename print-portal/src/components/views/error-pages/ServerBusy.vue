<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import ErrorList from '@/components/elements/ErrorList.vue';
import { goHome } from '@/tools/router';

export default {
    name: 'ServerBusy',
    components: { Page, PageIntro, CcButton, ErrorList },
    computed: {
        errors() {
            const errors = this.$route.query.error ? [this.$route.query.error] : []
            return errors.length ? errors : undefined
        },
        link () {
            const link = this.$t('views.serverBusy.link')
            return link
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
                :head="$t('views.serverBusy.pageHeader')"
                :intro="$t('views.serverBusy.pageIntro')">
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
