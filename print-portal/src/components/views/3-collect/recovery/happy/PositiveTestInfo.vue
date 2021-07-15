<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
// import dateTool from '@/tools/date';

export default {
    name: 'PositiveTestInfo',
    components: { SlotModal },
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
                {{$t('message.info.vaccinationAbout.head')}}
            </template>
            <template v-slot:body>
                Positive test data
            </template>
        </SlotModal>
    </portal>
</template>
