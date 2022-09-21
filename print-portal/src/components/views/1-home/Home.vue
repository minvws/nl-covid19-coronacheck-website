<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import UserConsent from './UserConsent';
import CcButton from '@/components/elements/CcButton';
import ErrorLabel from '@/components/elements/ErrorLabel';
import { goHome } from '@/tools/router';

export default {
    name: 'Home',
    components: {
        ErrorLabel,
        CcButton,
        Page,
        PageIntro,
        UserConsent
    },
    data() {
        return {
            clickedNext: false
        }
    },
    computed: {
        consent() {
            return this.$store.state.userConsent;
        },
        isUserConsentDisabledOnHome () {
            return this.$store.getters.isUserConsentDisabledOnHome;
        },
        intro () {
            const { is0G, is1G } = this.$store.getters
            const pageIntro = is0G ? '0G' : ''
            const pageBody = is0G ? '0G' : is1G ? '1G' : ''
            const intro = [
                this.$t(`views.home.pageIntro${pageIntro}`),
                this.$t(`views.home.pageBody${pageBody}`)
            ]
            return intro.join(' ')
        }
    },
    methods: {
        gotoHome() {
            goHome()
        },
        next() {
            this.clickedNext = true;
            if (this.isUserConsentDisabledOnHome) {
                // when isUserConsentDisabledOnHome is true, set consent to true
                this.setUserConsent(true)
            }
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
                :intro="intro"/>
            <div class="section-block">
                <h2 class="screen-reader-text">{{ $t('views.home.userConsentHeader') }}</h2>
                <template v-if="!isUserConsentDisabledOnHome">
                    <UserConsent
                        @update="setUserConsent"
                        :consent="consent"
                        :label="$t('views.home.userConsentText')"/>
                    <ErrorLabel
                        v-if="clickedNext && !consent"
                        :label="$t('views.home.noConsentError')"/>
                </template>
            </div>
            <div class="section-block">
                <CcButton
                    @select="next()"
                    :label="$t('next')"/>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.home {

    .home__section {
        margin-bottom: $length-l;
    }

    .ErrorLabel {
        margin-bottom: $length-s;
    }
}
</style>
