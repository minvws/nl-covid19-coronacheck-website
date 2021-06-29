<script>
import dateTool from '@/tools/date';
import SignedEvent from '@/classes/events/SignedEvent';

export default {
    name: 'NegativeTest',
    components: {},
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        negativeTest() {
            return this.signedEvent.event.negativetest;
        },
        dateOfTest() {
            return dateTool.dateTimeToString(this.negativeTest.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        },
        holder() {
            return this.signedEvent.holder;
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
                const testType = this.$store.getters.getNlTestType(this.negativeTest.testType)
                const dataForV2 = {
                    discreteInfoString: this.holder.discreteInfoString,
                    testType: testType ? testType.name : this.$t('unknown'),
                    testLocation,
                    sampleDate: this.dateOfTest,
                    identificationCode: this.signedEvent.event.unique
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
                    testType: (testType ? testType.name : this.$t('unknown')),
                    testName: (this.negativeTest.name.length ? this.negativeTest.name : this.$t('unknown')),
                    testLocation: this.negativeTest.facility,
                    sampleDate: this.dateOfTest,
                    manufacturer: manufacturer ? manufacturer.name : this.$t('unknown'),
                    identificationCode: this.signedEvent.event.unique,
                    country: this.negativeTest.country
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
        <div class="proof-event__status proof-event__line">
            <strong>{{$t('components.NegativeTest.resultNegative')}}</strong>
        </div>
        <div
            v-if="negativeTest.protocolVersion === '2.0'"
            class="proof-event__wrapper">
            <dl>
                <div class="proof-event__line">
                    <dt>{{$t('components.NegativeTest.dateOfTest')}}:</dt>
                    <dd>{{dateOfTest}}</dd>
                </div>
                <div class="proof-event__line">
                    <dt>{{$t('components.NegativeTest.yourCredentials')}}:</dt>
                    <dd>{{holder.discreteInfoString}}</dd>
                </div>
            </dl>
        </div>
        <div
            v-if="negativeTest.protocolVersion === '3.0'"
            class="proof-event__wrapper">
            <dl>
                <div class="proof-event__line">
                    <dt>{{$t('components.NegativeTest.dateOfTest')}}:</dt>
                    <dd>{{dateOfTest}}</dd>
                </div>
                <div class="proof-event__line">
                    <dt>{{$t('components.NegativeTest.name')}}:</dt>
                    <dd>{{holder.fullName}}</dd>
                </div>
                <div class="proof-event__line">
                    <dt>{{$t('components.NegativeTest.dateOfBirth')}}:</dt>
                    <dd>{{holder.birthDateString}}</dd>
                </div>
            </dl>
        </div>

        <button
            @click="openModalTestResultsAbout()"
            type="button"
            class="info-button">
            <img src="assets/img/icons/info.svg" alt=""/>
        </button>
    </div>
</template>
