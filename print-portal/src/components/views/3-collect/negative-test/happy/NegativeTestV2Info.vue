<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import testInfoMixin from '@/components/views/3-collect/_shared/test-info-mixin'

export default {
    name: 'NegativeTestV2Info',
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
            return this.signedEvent.event.negativetest;
        },
        testLocation() {
            if (this.$store.state.testCode) {
                const testProviderIdentifier = this.$store.state.testCode.split('-')[0]
                const testProvider = this.$store.getters['testProviders/getTestProviderByIdentifier'](testProviderIdentifier);
                if (testProvider) {
                    return testProvider.name;
                } else {
                    return this.$t('unknown');
                }
            } else {
                return this.$t('unknown');
            }
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
                    {{$t('components.test.info.detailsRetrieved')}}:
                </p>
                <p>
                    {{$t('components.test.yourCredentials')}}:
                    <strong>{{holder.discreteInfoString}}</strong><br>
                </p>
                <p>
                    {{$t('components.test.info.testType')}}:
                    <strong>{{testType}}</strong><br>
                    {{$t('components.eventInfo.dateOfTest')}}:
                    <strong>{{sampleDate}}</strong><br>
                    {{$t('components.eventInfo.testResult')}}:
                    <strong>{{$t('components.test.info.testResultNegative')}}:</strong><br>
                    {{$t('components.test.info.testLocation')}}:
                    <strong>{{testLocation}}</strong>
                </p>
                <p>
                    {{$t('components.eventInfo.identificationCode')}}:<br>
                    <strong>{{identificationCode}}</strong>
                </p>
            </template>
        </SlotModal>
    </portal>
</template>
