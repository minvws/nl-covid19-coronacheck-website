<script>
import Page from '@/components/elements/Page';
import Loading from '@/components/elements/Loading';

export default {
    name: 'YourVaccinations',
    components: { Loading, Page },
    computed: {},
    data() {
        return {
            isLoading: true,
            accessToken: ''
        }
    },
    methods: {
        back() {
            const callback = () => {
                // todo cancel all processes
                console.log('cancelling processes');
                this.$router.push({ name: 'CollectVaccination' });
            }
            if (this.isLoading) {
                this.$store.commit('modal/set', {
                    messageHead: 'Cancel',
                    messageBody: 'weet je het zeker?',
                    confirm: true,
                    confirmAction: callback,
                    confirmYes: this.$t('yes'),
                    confirmNo: this.$t('no'),
                    closeButton: false
                })
            } else {
                this.$router.push({ name: 'CollectVaccination' });
            }
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
    <div class="YourVaccinations">
        <Page
            @back="back">
            <div class="section">
                <div class="section-block">
                    <h2>
                        {{$t('views.yourVaccinations.pageHeader')}}
                    </h2>
                    <div
                        v-if="!isLoading"
                        v-html="$t('views.yourVaccinations.pageIntro')"/>
                </div>
                <div class="section-block">
                    <Loading v-if="isLoading"/>
                    <div v-else>
                        Je vaccinaties
                    </div>
                </div>
            </div>
        </Page>
    </div>
</template>

<style lang="scss">
.YourVaccinations {
}
</style>
