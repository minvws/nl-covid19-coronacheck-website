<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import { goHome } from '@/tools/router';

export default {
    name: 'BrowserNotSupported',
    components: {
        Page,
        PageIntro
    },
    methods: {
        goToHome () {
            goHome()
        }
    }
}
</script>

<template>
    <Page
        class="home"
        :display-back-button="false"
        >
        <div class="section">
            <PageIntro
                :head="$t('views.browserNotSupported.pageHeader')"
                :intro="$t('views.browserNotSupported.pageIntro')"/>
            <div class="section-block">
                <a class="text-link" @click="goToHome">{{ $t('views.browserNotSupported.button') }}</a>
            </div>
        </div>
    </Page>
</template>
<style scoped lang="scss">
.text-link {
    display: inline-block;
    padding-top: 8px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
}
</style>
