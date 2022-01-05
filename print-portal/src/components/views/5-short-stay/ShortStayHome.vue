<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'ShortStarHome',
    components: { Page, PageIntro }
}
</script>

<template>
    <Page :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.shortStay.pageHeader')"
                :intro="$t('views.shortStay.pageIntro')"
            />
            <div class="section-block">
            </div>
        </div>
    </Page>
</template>
