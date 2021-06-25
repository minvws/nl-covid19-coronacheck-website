<script>
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'

export default {
    name: 'NegativeTest',
    components: {},
    mixins: [proofEventMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.negativetest;
        }
    },
    methods: {
        openInfo() {
            if (this.proofEvent.protocolVersion === '2.0') {
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
                const testType = this.$store.getters.getNlTestType(this.proofEvent.testType)
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
                const testType = this.$store.getters.getEuTestType(this.proofEvent.type);
                const manufacturer = this.$store.getters.getTestManufacturer(this.proofEvent.manufacturer);
                const dataForV3 = {
                    name: this.holder.fullName,
                    birthDateString: this.holder.birthDateString,
                    testType: (testType ? testType.name : this.$t('unknown')),
                    testName: (this.proofEvent.name.length ? this.proofEvent.name : this.$t('unknown')),
                    testLocation: this.proofEvent.facility,
                    sampleDate: this.dateOfTest,
                    manufacturer: manufacturer ? manufacturer.name : this.$t('unknown'),
                    identificationCode: this.signedEvent.event.unique,
                    country: this.proofEvent.country
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
            {{$t('components.NegativeTest.resultNegative')}}
        </div>
        <div
            v-if="proofEvent.protocolVersion === '2.0'"
            class="proof-event__wrapper">
            <div class="proof-event__line">
                {{$t('components.proofEvent.dateOfTest')}}: {{dateOfTest}}
            </div>
            <div class="proof-event__line">
                {{$t('components.NegativeTest.yourCredentials')}}: {{holder.discreteInfoString}}
            </div>
        </div>
        <div
            v-if="proofEvent.protocolVersion === '3.0'"
            class="proof-event__wrapper">
            <div class="proof-event__line">
                {{$t('components.proofEvent.dateOfTest')}}: {{dateOfTest}}
            </div>
            <div class="proof-event__line">
                {{$t('components.proofEvent.name')}}: {{holder.fullName}}
            </div>
            <div class="proof-event__line">
                {{$t('components.proofEvent.dateOfBirth')}}: {{holder.birthDateString}}
            </div>
        </div>

        <button
            @click="openInfo()"
            type="button"
            class="info-button">
            <img src="assets/img/icons/info.svg" alt=""/>
        </button>
    </div>
</template>
