<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { RouterNames } from '@/router/pages/short-stay'

export default {
    name: 'ShortStayCodeError',
    components: { Page, PageIntro, CcButton },
    methods: {
        onSelect () {
            this.$router.replace({
                name: RouterNames.ASSESSMENT
            })
        }
    },
    mounted () {
        // clear all events
        this.$store.dispatch('signedEvents/clearAll')
    }
}
</script>

<template>
    <Page :display-back-button="false">
        <div class="section">
            <PageIntro
                :head="$t('views.shortStayNoAssessmentCode.pageHeader')"
                :intro="$t('views.shortStayNoAssessmentCode.pageIntro')"
            />
            <div class="section-block">
                <CcButton
                    id="create-qr-negative-test"
                    :label="$t('views.shortStayNoAssessmentCode.button')"
                    @select="onSelect"
                />
            </div>
        </div>
    </Page>
</template>
