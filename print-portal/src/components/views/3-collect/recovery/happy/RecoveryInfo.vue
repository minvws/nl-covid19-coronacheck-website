<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'
import dateTool from '@/tools/date';

export default {
    name: 'RecoveryInfo',
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
            return this.signedEvent.event.recovery;
        },
        validFrom() {
            return dateTool.dateTimeToString(this.proofEvent.validFrom, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        },
        validUntil() {
            return dateTool.dateTimeToString(this.proofEvent.validUntil, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
        },
        sampleDate() {
            return dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
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
                    {{$t('components.recovery.info.detailsRetrieved')}}:
                </p>
                <p>
                    {{$t('components.eventInfo.name')}}:
                    <strong>{{holder.fullName}}</strong><br>
                    {{$t('components.eventInfo.dateOfBirth')}}:
                    <strong>{{birthDateString}}</strong>
                </p>
                <p>
                    {{$t('components.eventInfo.dateOfTest')}}:
                    <b>{{sampleDate}}</b><br>
                    {{$t('components.eventInfo.validFrom')}}:
                    <b>{{validFrom}}</b><br>
                    {{$t('components.eventInfo.validUntil')}}:
                    <b>{{validUntil}}</b>
                </p>
                <p>
                    {{$t('components.eventInfo.identificationCode')}}:<br>
                    <strong>{{identificationCode}}</strong>
                </p>
            </template>
        </SlotModal>
    </portal>
</template>
