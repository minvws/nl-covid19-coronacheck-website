<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import UserConsent from './UserConsent';
import PreferMobile from '@/components/elements/PreferMobile';
import CcButton from '@/components/elements/CcButton';
import ErrorLabel from '@/components/elements/ErrorLabel';

export default {
    name: 'Home',
    components: {
        ErrorLabel,
        CcButton,
        Page,
        PageIntro,
        UserConsent,
        PreferMobile
    },
    data() {
        return {
            clickedNext: false
        }
    },
    computed: {
        consent() {
            return this.$store.state.userConsent;
        }
    },
    methods: {
        gotoHome() {
            window.location = 'https://coronacheck.nl/nl/';
        },
        next() {
            this.clickedNext = true;
            if (this.consent) {
                this.$router.push({ name: 'ChoiceProof' });
            }
        },
        setUserConsent(value) {
            this.$store.commit('setUserConsent', value);
        }
    }
}
</script>

<template>
    <Page
        class="home"
        @back="gotoHome">
        <div class="section">
            <PageIntro
                :head="$t('views.home.pageHeader')"
                :intro="$t('views.home.pageIntro')"/>
            <div class="section-block">
                <UserConsent
                    @update="setUserConsent"
                    :consent="consent"
                    :label="$t('views.home.userConsentText')"/>
                <ErrorLabel
                    v-if="clickedNext && !consent"
                    :label="$t('views.home.noConsentError')"/>
            </div>
            <div class="section-block">
                <CcButton
                    @select="next()"
                    :label="$t('next')"/>
            </div>
        </div>
        <PreferMobile/>
    </Page>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.home {

    .UserConsent {
        margin: $grid-x6 0 $length-s 0;
    }

    .ErrorLabel {
        margin-bottom: $length-s;
    }
}
</style>
