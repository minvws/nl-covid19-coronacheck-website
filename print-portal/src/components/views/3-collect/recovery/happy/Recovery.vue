<script>
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import SignedEvent from '@/classes/events/SignedEvent';
import RecoveryInfo from './RecoveryInfo';
import InfoButton from '@/components/views/3-collect/_shared/InfoButton';

export default {
    name: 'Recovery',
    components: { RecoveryInfo, InfoButton },
    mixins: [proofEventMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.recovery;
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status proof-event__line">
            <strong>{{$t('components.recovery.title')}}</strong>
        </div>

        <dl>
            <div class="proof-event__line">
                <dt>{{$t('components.eventInfo.name')}}:</dt>
                <dd>{{holder.fullName}}</dd>
            </div>
            <div class="proof-event__line">
                <dt>{{$t('components.eventInfo.dateOfBirth')}}:</dt>
                <dd>{{holder.birthDateString}}</dd>
            </div>
        </dl>

        <InfoButton
            @select="openInfo"
            :showInfo="showInfo"/>

        <RecoveryInfo
            v-if="showInfo"
            @close="closeInfo"
            :signed-event="signedEvent"/>
    </div>
</template>

<style lang="scss"></style>
