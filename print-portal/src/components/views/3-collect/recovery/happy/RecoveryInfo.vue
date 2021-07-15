<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
// import dateTool from '@/tools/date';

export default {
    name: 'RecoveryInfo',
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
        //     const testDate = dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        // const validFrom = dateTool.dateTimeToString(this.proofEvent.validFrom, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        // const validUntil = dateTool.dateTimeToString(this.proofEvent.validUntil, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        // const data = {
        //     name: this.holder.fullName,
        //     birthDateString: this.holder.birthDateString,
        //     testDate,
        //     validFrom,
        //     validUntil,
        //     identificationCode: this.signedEvent.event.unique
        // }
        // this.$store.commit('modal/set', {
        //     messageHead: this.$t('message.info.recoveryAbout.head'),
        //     messageBody: this.$t('message.info.recoveryAbout.body', data),
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
                Recovery data
            </template>
        </SlotModal>
    </portal>
</template>
