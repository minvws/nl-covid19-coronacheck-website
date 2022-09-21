<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { goHome } from '@/tools/router';
import ErrorQueryParams from '@/components/mixins/ErrorQueryParams';

export default {
    name: 'ErrorTokenFlow',
    mixins: [ErrorQueryParams('errorTokenFlow')],
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
                :head="$t('views.errorTokenFlow.pageHeader')"
                :intro="$t('views.errorTokenFlow.pageIntro')">
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
