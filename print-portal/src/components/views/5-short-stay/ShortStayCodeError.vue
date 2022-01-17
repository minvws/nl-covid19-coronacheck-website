<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'ShortStayCodeError',
    components: { Page, PageIntro, CcButton },
    methods: {
        onSelect () {
            this.$router.go(-1);
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
