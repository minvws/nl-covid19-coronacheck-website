<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import { homeLink } from '@/tools/router';

export default {
    name: 'BrowserNotSupported',
    components: {
        Page,
        PageIntro
    },
    computed: {
        home () {
            return homeLink()
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
                <a class="link" :href="home">{{ $t('views.browserNotSupported.button') }}</a>
            </div>
        </div>
    </Page>
</template>
<style scoped lang="scss">
.link {
    display: inline-block;
    padding-top: 8px;
    font-weight: bold;
    text-decoration: none;
}
</style>
