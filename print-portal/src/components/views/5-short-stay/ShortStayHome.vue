<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { RouterNames } from '@/router/pages/short-stay.js'
import { goHome } from '@/tools/router'
export default {
    name: 'ShortStarHome',
    components: { Page, PageIntro, CcButton },
    computed: {
        name () {
            return RouterNames.ASSESSMENT
        }
    },
    created () {
        // go to home when feature flag is disabled
        if (this.$store.getters.visitorPassEnabled) return
        goHome()
    }
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
                    @select="$router.push({ name })"
                    :label="$t('views.shortStay.button')"
                />
            </div>
        </div>
    </Page>
</template>
