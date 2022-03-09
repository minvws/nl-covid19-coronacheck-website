<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { goHome } from '@/tools/router';

export default {
    name: 'ErrorCodeSaml',
    components: { Page, PageIntro, CcButton },
    methods: {
        goHome() {
            goHome();
        }
    }
}
</script>

<template>
    <Page>
        <div class="section">
            <PageIntro
                :head="$t('views.errorCodeSaml.pageHeader')"
                :intro="$t('views.errorCodeSaml.pageIntro')"
            />
            <div class="section-block">
                <div class="section-block__footer">
                    <CcButton
                        @select="goHome"
                        :label="$t('goBackToStart')"/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss" scoped>
.section-block__footer {
    padding-top: 8px;
}
</style>
