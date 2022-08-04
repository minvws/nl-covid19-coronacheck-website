<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import ErrorQueryParams from '@/components/mixins/ErrorQueryParams';
import { goHome } from '@/tools/router';

export default {
    name: 'ServerBusy',
    mixins: [ErrorQueryParams('serverBusy')],
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
                :head="$t('views.serverBusy.pageHeader')"
                :intro="$t('views.serverBusy.pageIntro')">
                <ErrorList v-if="hasErrorList" v-bind="{ errors, link }" />
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
