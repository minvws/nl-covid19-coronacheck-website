<script>
import Page from '@/components/elements/Page';

export default {
    name: 'CollectVaccination',
    components: { Page },
    data() {
        return {
            accessToken: ''
        }
    },
    computed: {},
    methods: {
        getToken() {
            this.mgr.signinRedirect();
        },
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        },
        readToken() {
            let params = decodeURI(window.location.hash);
            if (params[0] === '#') {
                params = params.substring(1)
            }
            this.accessToken = new URLSearchParams(params).get('access_token');
            this.$store.commit('setUserConsent', true);
        }
    },
    mounted() {
        this.readToken();
    }
}
</script>

<template>
    <Page
        @back="back">
        <div class="section">
            <div class="section-block">
                <h2>
                    {{$t('views.collectVaccination.pageHeader')}}
                </h2>
                <div v-html="$t('views.collectVaccination.pageIntro')"/>
            </div>
            <div class="section-block">
                <button
                    v-if="!accessToken || accessToken.length === 0"
                    type="button"
                    class="btn"
                    @click="getToken">
                    {{$t('views.collectVaccination.loginDigid')}}
                </button>
                <span v-else>
                    {{accessToken}}
                </span>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
    .CollectVaccination {

    }
</style>
