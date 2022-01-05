<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'ShortStarHome',
    components: { Page, PageIntro, CcButton }
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
                <CcButton
                    id="create-qr-negative-test"
                    @select="gotoPrint()"
                    :label="$t('views.shortStay.button')"
                />
            </div>
        </div>
    </Page>
</template>
