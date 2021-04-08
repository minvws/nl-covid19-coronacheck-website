<script>
import TestResult from './TestResult';
import Navigation from '@/components/elements/Navigation';
import axios from 'axios';

export default {
    name: 'YourTestResults',
    components: { Navigation, TestResult },
    computed: {
        testResult() {
            return this.$store.state.testResult;
        },
        signature() {
            return this.$store.state.signature;
        }
    },
    methods: {
        createTestCertificate() {
            if (this.signature) {
                const url = 'https://api-ct.bananenhalen.nl/staticproof/paper';
                axios({
                    method: 'post',
                    url: url,
                    data: this.signature
                }).then((response) => {
                    if (response.data.status === 'ok' && response.data.error === 0) {
                        this.$store.commit('setQrCode', response.data.qr.data);
                        this.$router.push({ name: 'Print' });
                    }
                    console.log(response);
                }).catch((error) => {
                    console.error(error);
                })
            } else {
                // todo
                console.error('no signature')
            }
        },
        goBack() {
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>

<template>
    <div class="YourTestResults">
        <div class="pagewrap">
            <Navigation
                :callback-back="goBack"/>
            <div class="section">
                <div class="section-block">
                    <h1>
                        Jouw negatieve testresultaat
                    </h1>
                    <p v-if="testResult">
                        Je hebt 1 nieuw negatief testresultaat (geen corona). Maak van dit resultaat een QR-code. Dat is jouw bewijs.
                    </p>
                    <div
                        v-if="testResult"
                        class="YourTestResults__results">
                        <TestResult
                            :testResult="testResult"/>
                    </div>
                    <div v-else>
                        Geen testresultaat bekend
                    </div>
                    <div
                        v-if="testResult"
                        class="YourTestResults__footer">
                        <button
                            @click="createTestCertificate()">
                            Maak testbewijs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.YourTestResults {

    .YourTestResults__footer {
        margin-top: 70px;
    }
}
</style>
