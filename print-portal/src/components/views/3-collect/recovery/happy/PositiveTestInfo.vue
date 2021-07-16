<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import testInfoMixin from '@/components/views/3-collect/_shared/test-info-mixin'

export default {
    name: 'PositiveTestInfo',
    components: { SlotModal },
    mixins: [testInfoMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.positivetest;
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
                    {{$t('components.test.info.testType')}}:
                    <strong>{{testType}}</strong><br>
                    {{$t('components.test.info.testName')}}:
                    <strong>{{testName}}</strong><br>
                    {{$t('components.eventInfo.dateOfTest')}}:
                    <strong>{{sampleDate}}</strong><br>
                    {{$t('components.eventInfo.testResult')}}:
                    <strong>{{$t('components.test.info.testResultPositive')}}:</strong><br>
                    {{$t('components.test.info.testManufacturer')}}:
                    <strong>{{testManufacturer}}</strong><br>
                    {{$t('components.test.info.testLocation')}}:
                    <strong>{{testLocation}}</strong><br>
                    {{$t('components.test.info.testCountry')}}:
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
