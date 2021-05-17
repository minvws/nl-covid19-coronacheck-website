<script>
import Page from '@/components/elements/Page';
import PreferMobile from '@/components/elements/PreferMobile';
import UserConsent from './UserConsent';

export default {
    name: 'Home',
    components: {
        Page,
        PreferMobile,
        UserConsent
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
    <Page
        class="home"
        @back="gotoHome">
        <div class="section">
            <div class="section-block">
                <h2>
                    {{$t('printPortalHomeHeader')}}
                </h2>
                <div v-html="$t('printPortalHomeBodyText')"/>
            </div>
            <div class="section-block">
                <UserConsent
                    :consent="consent"
                    @update="setUserConsent"
                    :label="$t('userConsentText')"/>
            </div>
            <div class="section-block">
                <button
                    @click="gotoProvideCode()"
                    type="button"
                    :disabled="!consent"
                    :class="{'button--inactive': !consent}"
                    class="btn">
                    {{$t('next')}}
                </button>
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
}
</style>
