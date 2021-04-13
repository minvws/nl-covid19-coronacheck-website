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
                        this.goto('Print')
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
            this.goto('ProvideCode');
        }
    }
}
</script>

<template>
    <div class="YourTestResults">
        <div class="pagewrap">
            <Navigation
                v-if="testResult"
                :callback-back="goBack"/>
            <div class="section">
                <div class="section-block">
                    <div v-if="testResult">
                        <header>
                            <h2>
                                Jouw negatieve testresultaat
                            </h2>
                        </header>
                        <p>
                            Je hebt 1 nieuw negatief testresultaat (geen corona). Maak van dit resultaat een QR-code. Dat is jouw bewijs.
                        </p>
                        <div class="YourTestResults__header">
                            Opgehaald testresultaat
                            <button
                                @click="goto('HelpTestResult')"
                                class="info-button">
                            </button>
                        </div>
                        <div class="YourTestResults__results">
                            <TestResult
                                :testResult="testResult"/>
                            <button
                                @click="goto('HelpTestResult')"
                                class="button-modest">
                                Er klopt iets niet
                            </button>
                        </div>
                        <div class="YourTestResults__footer">
                            <button
                                @click="createTestCertificate()"
                                class="button-standard">
                                Maak testbewijs
                            </button>
                        </div>
                    </div>

                    <div v-else>
                        <header>
                            <h2>
                                Er is geen testuitslag bekend
                            </h2>
                        </header>
                        <p>
                            Haal eerst je tesultaat op. Gebruik hiervoor de code die je van de testlocatie hebt gekregen.
                        </p>
                        <div class="section-block__footer">
                            <button
                                @click="goBack()"
                                class="button-standard">
                                Testuitslag ophalen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.YourTestResults {

    .YourTestResults__header {
        position: relative;
        margin: 48px 0 16px 0;
        font-weight: 700;
    }

    .YourTestResults__footer {
        margin-top: 70px;
    }
}
</style>
