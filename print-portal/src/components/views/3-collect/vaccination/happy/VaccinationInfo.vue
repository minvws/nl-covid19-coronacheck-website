<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'
import VaccinationInfoItem from './VaccinationInfoItem';

export default {
    name: 'VaccinationInfo',
    components: { VaccinationInfoItem, SlotModal },
    mixins: [proofEventInfoMixin],
    props: {
        signedEventSet: {
            type: Array,
            required: true
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
                <VaccinationInfoItem
                    class="signed-event"
                    v-for="(signedEvent, index) of signedEventSet"
                    :signed-event="signedEvent"
                    :key="index"/>
            </template>
        </SlotModal>
    </portal>
</template>
