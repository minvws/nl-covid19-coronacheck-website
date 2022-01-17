<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { RouterNames } from '@/router/pages/short-stay.js'
import { goHome } from '@/tools/router'
import UserConsent from '@/components/views/1-home/UserConsent';
import ErrorLabel from '@/components/elements/ErrorLabel';

export default {
    name: 'ShortStarHome',
    components: { Page, PageIntro, CcButton, UserConsent, ErrorLabel },
    computed: {
        name () {
            return RouterNames.ASSESSMENT
        },
        consent() {
            return this.$store.state.userConsent;
        }
    },
    created () {
        // go to home when feature flag is disabled
        if (this.$store.getters.visitorPassEnabled) return
        goHome()
    },
    data () {
        return {
            clickedNext: false
        }
    },
    methods: {
        onSelect () {
            this.clickedNext = true
            if (!this.consent) return
            this.$router.push({ name: this.name })
        },
        setUserConsent(value) {
            this.$store.commit('setUserConsent', value);
        }
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
                 <UserConsent
                    @update="setUserConsent"
                    :consent="consent"
                    :label="$t('views.home.userConsentText')"
                />
                 <ErrorLabel
                    v-if="clickedNext && !consent"
                    :label="$t('views.home.noConsentError')"
                />
                <CcButton
                    id="create-qr-negative-test"
                    @select="onSelect"
                    :label="$t('views.shortStay.button')"
                />
            </div>
        </div>
    </Page>
</template>
