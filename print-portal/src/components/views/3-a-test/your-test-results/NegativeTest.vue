<script>
import dateTool from '@/tools/date';
import ProofEvent from '@/classes/events/ProofEvent';

export default {
    name: 'NegativeTest',
    components: {},
    props: {
        negativeTestProofEvent: {
            type: ProofEvent,
            required: true
        }
    },
    computed: {
        negativeTest() {
            return this.negativeTestProofEvent.negativetest;
        },
        date() {
            return dateTool.dateTimeToString(this.negativeTest.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        },
        holder() {
            return this.$store.state.holder;
        }
    },
    methods: {
        openModalTestResultsAbout() {
            if (this.negativeTest.protocolVersion === '2.0') {
                let testLocation;
                if (this.$store.state.testCode) {
                    const testProviderIdentifier = this.$store.state.testCode.split('-')[0]
                    const testProvider = this.$store.getters['testProviders/getTestProviderByIdentifier'](testProviderIdentifier);
                    if (testProvider) {
                        testLocation = testProvider.name;
                    }
                } else {
                    testLocation = ''
                }
                const testType = this.$t('testTypes.' + this.negativeTest.testType);
                const dataForV2 = {
                    discreteInfoString: this.holder.discreteInfoString,
                    testType,
                    testLocation,
                    sampleDate: this.date,
                    identificationCode: this.negativeTestProofEvent.unique
                }
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.info.testResultAbout.head'),
                    messageBody: this.$t('message.info.testResultAbout.bodyV2', dataForV2),
                    closeButton: true
                })
            } else {
                const testType = this.$store.getters.getEuTestType(this.negativeTest.type);
                const manufacturer = this.$store.getters.getTestManufacturer(this.negativeTest.manufacturer);
                const dataForV3 = {
                    name: this.holder.fullName,
                    birthDateString: this.holder.birthDateString,
                    testType: (testType ? testType.name : '-'),
                    testName: this.negativeTest.name,
                    testLocation: this.negativeTest.facility,
                    sampleDate: this.date,
                    manufacturer: manufacturer ? manufacturer.name : '-',
                    identificationCode: this.negativeTestProofEvent.unique
                }
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.info.testResultAbout.head'),
                    messageBody: this.$t('message.info.testResultAbout.bodyV3', dataForV3),
                    closeButton: true
                })
            }
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status">
            {{$t('components.NegativeTest.resultNegative')}}
        </div>
        <div v-if="negativeTest.protocolVersion === '2.0'">
            <div class="proof-event__line">
                {{$t('components.NegativeTest.dateOfTest')}}: {{date}}
            </div>
            <div class="proof-event__line">
                {{$t('components.NegativeTest.yourCredentials')}}: {{holder.discreteInfoString}}
            </div>
        </div>
        <div v-if="negativeTest.protocolVersion === '3.0'">
            <div class="proof-event__line">
                {{$t('components.NegativeTest.name')}}: {{holder.fullName}}
            </div>
            <div class="proof-event__line">
                {{$t('components.NegativeTest.dateOfBirth')}}: {{holder.birthDateString}}
            </div>
        </div>

        <button
            @click="openModalTestResultsAbout()"
            type="button"
            class="info-button">
            <img src="assets/img/icons/info.svg" alt=""/>
        </button>
    </div>
</template>
