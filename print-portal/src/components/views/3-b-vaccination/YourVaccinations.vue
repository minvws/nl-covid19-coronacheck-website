<script>
import Page from '@/components/elements/Page';
import Loading from '@/components/elements/Loading';
import mockData from '@/data/mock/data';

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
            // mock connection
            setTimeout(this.retrieveResults, 1000);
        },
        retrieveResults() {
            const result = mockData;
            console.log(result);
            this.$store.commit('updateHolder', result.holder);
            for (const proofEvent of result.events) {
                this.$store.commit('proofEvents/create', proofEvent);
            }
            // const vaccinations = result.filter(ev => ev.type === 'vaccination').map(ev => ev.vaccination);
            // this.$store.commit('/init', vaccinations);
            // this.isLoading = false;
        }
    },
    mounted() {
        this.readToken();
    }
}
</script>

<template>
    <Page
        class="YourVaccinations"
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
            <div
                v-if="isLoading"
                class="section-block">
                <Loading
                    :text="'(Mocking digid connection...)'"/>
            </div>
            <div
                v-else
                class="section-block">
                Je vaccinaties
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
.YourVaccinations {
}
</style>
