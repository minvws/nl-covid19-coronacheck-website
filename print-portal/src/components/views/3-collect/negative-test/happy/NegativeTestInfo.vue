<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'
import dateTool from '@/tools/date';

export default {
    name: 'NegativeTestInfo',
    components: { SlotModal },
    mixins: [proofEventInfoMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.negativetest;
        },
        holder() {
            return this.signedEvent.holder;
        },
        sampleDate() {
            return dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        },
        testType() {
            const testType = this.$store.getters.getNlTestType(this.proofEvent.testType)
            return testType ? testType.name : this.$t('unknown')
        },
        testName() {
            return this.proofEvent.name.length ? this.proofEvent.name : this.$t('unknown')
        },
        testLocation() {
            return this.proofEvent.facility;
        },
        testManufacturer() {
            const manufacturer = this.$store.getters.getTestManufacturer(this.proofEvent.manufacturer);
            return manufacturer ? manufacturer.name : this.$t('unknown');
        },
        testCountry() {
            return this.proofEvent.country;
        }
        // openInfo() {
        //     if (this.proofEvent.protocolVersion === '2.0') {
        //         let testLocation;
        //         if (this.$store.state.testCode) {
        //             const testProviderIdentifier = this.$store.state.testCode.split('-')[0]
        //             const testProvider = this.$store.getters['testProviders/getTestProviderByIdentifier'](testProviderIdentifier);
        //             if (testProvider) {
        //                 testLocation = testProvider.name;
        //             }
        //         } else {
        //             testLocation = ''
        //         }
        //         const testType = this.$store.getters.getNlTestType(this.proofEvent.testType)
        //         const dataForV2 = {
        //             discreteInfoString: this.holder.discreteInfoString,
        //             testType: testType ? testType.name : this.$t('unknown'),
        //             testLocation,
        //             sampleDate: this.dateOfTest,
        //             identificationCode: this.signedEvent.event.unique
        //         }
        //         this.$store.commit('modal/set', {
        //             messageHead: this.$t('message.info.testResultAbout.head'),
        //             messageBody: this.$t('message.info.testResultAbout.bodyV2', dataForV2),
        //             closeButton: true
        //         })
        //     } else {
        //         const testType = this.$store.getters.getEuTestType(this.proofEvent.type);
        //         const manufacturer = this.$store.getters.getTestManufacturer(this.proofEvent.manufacturer);
        //         const dataForV3 = {
        //             name: this.holder.fullName,
        //             birthDateString: this.holder.birthDateString,
        //             testType: (testType ? testType.name : this.$t('unknown')),
        //             testName: (this.proofEvent.name.length ? this.proofEvent.name : this.$t('unknown')),
        //             testLocation: this.proofEvent.facility,
        //             sampleDate: this.dateOfTest,
        //             manufacturer: manufacturer ? manufacturer.name : this.$t('unknown'),
        //             identificationCode: this.signedEvent.event.unique,
        //             country: this.proofEvent.country
        //         }
        //         this.$store.commit('modal/set', {
        //             messageHead: this.$t('message.info.testResultAbout.head'),
        //             messageBody: this.$t('message.info.testResultAbout.bodyV3', dataForV3),
        //             closeButton: true
        //         })
        //     }
        // }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<template>
    <portal to="root">
        <SlotModal @close="close">
            <template v-slot:head>
                {{$t('components.eventInfo.head')}}
            </template>
            <template v-slot:body>
                <p>
                    {{$t('components.negativeTest.info.detailsRetrieved')}}:
                </p>
                <p>
                    {{$t('components.eventInfo.name')}}:
                    <strong>{{holder.fullName}}</strong><br>
                    {{$t('components.eventInfo.dateOfBirth')}}:
                    <strong>{{birthDateString}}</strong>
                </p>
                <p>
                    {{$t('components.negativeTest.info.testType')}}:
                    <strong>{{testType}}</strong><br>
                    {{$t('components.negativeTest.info.testName')}}:
                    <strong>{{testName}}</strong><br>
                    {{$t('components.eventInfo.dateOfTest')}}:
                    <strong>{{sampleDate}}</strong><br>
                    {{$t('components.eventInfo.testResult')}}:
                    <strong>{{$t('components.negativeTest.info.testResultNegative')}}:</strong><br>
                    {{$t('components.negativeTest.info.testManufacturer')}}:
                    <strong>{{testLocation}}</strong><br>
                    {{$t('components.negativeTest.info.testLocation')}}:
                    <strong>{{testManufacturer}}</strong><br>
                    {{$t('components.negativeTest.info.testCountry')}}:
                    <strong>{{testCountry}}</strong>
                </p>
                <p>
                    {{$t('components.eventInfo.identificationCode')}}:<br>
                    <strong>{{identificationCode}}</strong>
                </p>
            </template>
        </SlotModal>
    </portal>
</template>
