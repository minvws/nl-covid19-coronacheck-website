<script>
import Navigation from '@/components/elements/Navigation';
import PreferMobile from '@/components/elements/PreferMobile';
import Footer from '@/components/elements/Footer';
import UserConsent from './UserConsent';

export default {
    name: 'Home',
    components: {
        PreferMobile,
        Footer,
        UserConsent,
        Navigation
    },
    computed: {
        consent() {
            return this.$store.state.userConsent;
        },
        consentLabel() {
            return 'Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank">privacyverklaring</a> gelezen en geef toestemming voor het verwerken van mijn persoonsgegevens.';
        }
    },
    methods: {
        gotoHome() {
            window.location = 'https://coronacheck.nl/nl/';
        },
        gotoProvideCode() {
            this.$router.push({ name: 'ProvideCode' });
        },
        setUserConsent(value) {
            this.$store.commit('setUserConsent', value);
        }
    }
}
</script>

<template>
    <div class="home">
        <div class="pagewrap">
            <Navigation
                :callback-back="gotoHome"/>
            <div class="section">
                <div class="section-block">
                    <h2>
                        {{translate('printPortalHomeHeader')}}
                    </h2>
                    <div v-html="translate('printPortalHomeBodyText')"/>
                </div>
                <div class="section-block">
                    <UserConsent
                        :consent="consent"
                        @update="setUserConsent"
                        :label="consentLabel"/>
                </div>
                <div class="section-block">
                    <button
                        @click="gotoProvideCode()"
                        type="button"
                        :disabled="!consent"
                        :class="{'button--inactive': !consent}"
                        class="button-standard">
                        {{translate('next')}}
                    </button>
                </div>
            </div>
            <PreferMobile/>
        </div>
        <Footer/>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.home {

    .UserConsent {
        margin: $grid-x6 0 $length-s 0;
    }
}
</style>
