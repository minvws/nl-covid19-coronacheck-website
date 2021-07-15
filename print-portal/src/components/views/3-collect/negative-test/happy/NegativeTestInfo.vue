<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import eventInfoMixin from '@/components/views/3-collect/_shared/event-info-mixin'

export default {
    name: 'NegativeTestInfo',
    components: { SlotModal },
    mixins: [eventInfoMixin],
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
                    {{$t('components.eventInfo.detailsRetrieved')}}:
                </p>
                <p>
                    {{$t('components.eventInfo.name')}}:
                    <strong>{{holder.fullName}}</strong><br>
                    {{$t('components.eventInfo.dateOfBirth')}}:
                    <strong>{{birthDateString}}</strong>
                </p>
            </template>
        </SlotModal>
    </portal>
</template>
