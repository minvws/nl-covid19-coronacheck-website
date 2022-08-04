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
        list() {
            return this.$route.query?.errors?.split('+') ?? undefined
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
                <div
                    v-if="list">
                    <p><strong>{{ $t('views.errorGeneral.label') }}</strong></p>
                    <ul class="ul--with-padding">
                        <i18n path="xss" tag="li" :key="index" v-for="(item, index) in list">
                        {{ item }}
                        </i18n>
                    </ul>
                </div>
                <template v-if="link">
                    <br>
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
