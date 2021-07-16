<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'
import dateTool from '@/tools/date';

export default {
    name: 'PositiveTestInfo',
    components: { SlotModal },
    mixins: [proofEventInfoMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        vaccination() {
            return this.signedEvent.event.vaccination;
        },
        holder() {
            return this.signedEvent.holder;
        },
        identificationCode() {
            return this.signedEvent.event.unique;
        },
        sampleDate() {
            return dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        }
        // openInfo() {
        // const testType = this.$store.getters.getEuTestType(this.proofEvent.type);
        // const manufacturer = this.$store.getters.getTestManufacturer(this.proofEvent.manufacturer);
        // const data = {
        //     name: this.holder.fullName,
        //     birthDateString: this.holder.birthDateString,
        //     testType: (testType ? testType.name : this.$t('unknown')),
        //     testName: (this.proofEvent.name.length ? this.proofEvent.name : this.$t('unknown')),
        //     testLocation: this.proofEvent.facility,
        //     sampleDate: this.dateOfTest,
        //     manufacturer: manufacturer ? manufacturer.name : this.$t('unknown'),
        //     identificationCode: this.signedEvent.event.unique,
        //     country: this.proofEvent.country
        // }
        // this.$store.commit('modal/set', {
        //     messageHead: this.$t('message.info.positiveTestResultAbout.head'),
        //     messageBody: this.$t('message.info.positiveTestResultAbout.body', data),
        //     closeButton: true
        // })
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
                    {{$t('components.positiveTest.info.detailsRetrieved')}}:
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
