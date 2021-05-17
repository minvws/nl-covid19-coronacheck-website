<script>
import Page from '@/components/elements/Page';

export default {
    name: 'Vaccination',
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
            this.$router.push({ name: 'Home' })
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
        <button
            v-if="!accessToken || accessToken.length === 0"
            type="button"
            class="btn"
            @click="getToken">
            Get token
        </button>
        <span v-else>
            {{accessToken}}
        </span>
    </Page>
</template>

<style lang="scss">
.Vaccination {

}
</style>
