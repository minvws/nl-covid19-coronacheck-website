<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import Loading from '@/components/elements/Loading';
import mockData from '@/data/mock/data';
import HolderV3 from '@/classes/holder/HolderV3';

export default {
    name: 'YourVaccinationsRedirect',
    components: { Page, PageIntro, Loading },
    data() {
        return {
            isLoading: true,
            accessToken: ''
        }
    },
    computed: {},
    methods: {
        back() {
            const callback = () => {
                if (this.isLoading) {
                    // todo cancel all processes
                    console.log('cancelling processes');
                }
                this.$store.commit('clearAll')
                this.$store.commit('proofEvents/clear')
                this.$router.push({ name: 'CollectVaccination' });
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.areYouSureToCancelVaccination.head'),
                messageBody: this.$t('message.info.areYouSureToCancelVaccination.body'),
                confirm: true,
                confirmAction: callback,
                confirmYes: this.$t('message.info.areYouSureToCancelVaccination.yes'),
                confirmNo: this.$t('message.info.areYouSureToCancelVaccination.no'),
                closeButton: false
            })
        },
        readToken() {
            let params = decodeURI(window.location.hash);
            if (params[0] === '#') {
                params = params.substring(1)
            }
            this.accessToken = new URLSearchParams(params).get('access_token');
            this.$store.commit('setUserConsent', true);
            // mock connection
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        getResult(event) {
            const result = mockData;
            this.$store.commit('proofEvents/clear');
            switch (event) {
            case 'one-vaccination':
                this.$store.commit('updateHolder', new HolderV3(result.holder));
                this.$store.commit('proofEvents/create', result.events[0]);
                this.$router.push({ name: 'YourVaccinations' });
                break;
            case 'two-vaccinations':
                this.$store.commit('updateHolder', new HolderV3(result.holder));
                for (const proofEvent of result.events) {
                    this.$store.commit('proofEvents/create', proofEvent);
                }
                this.$router.push({ name: 'YourVaccinations' });
                break;
            case 'not-possible':
                this.$router.push({ name: 'VaccinationsNotPossible' });
                break;
            case 'no-vaccinations':
                this.$router.push({ name: 'VaccinationsNone' });
                break;
            }
        }
    },
    mounted() {
        this.readToken();
    }
}
</script>

<template>
    <Page
        class="YourTestResultsRedirect"
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.yourTestResults.pageHeader')"/>
            <div
                v-if="isLoading"
                class="section-block">
                <Loading
                    :text="'(Mocking digid connection...)'"/>
            </div>
            <div v-else class="mock-choices">
                Mocking the result, options:<br><br>
                <button
                    @click="getResult('one-vaccination')">One vaccination</button>

                <button
                    @click="getResult('two-vaccinations')">Two vaccinations</button>

                <button
                    @click="getResult('not-possible')">Not possible</button>

                <button
                    @click="getResult('no-vaccinations')">No vaccinations</button>
            </div>
        </div>
    </Page>
</template>

<style lang="scss" scoped>

    .mock-choices {
        width: 100%;
    }
    button {
        background: #ddd;
        padding: 8px;
        cursor: pointer;
        margin: 10px;

        &:hover {
            background: pink;
        }
    }
</style>
