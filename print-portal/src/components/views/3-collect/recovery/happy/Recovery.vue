<script>
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import SignedEvent from '@/classes/events/SignedEvent';
import RecoveryInfo from './RecoveryInfo';

export default {
    name: 'Recovery',
    components: { RecoveryInfo },
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
            {{$t('components.recovery.title')}}
        </div>

        <dl>
            <div class="proof-event__line">
                <dt>{{$t('components.proofEvent.name')}}:</dt>
                <dd>{{holder.fullName}}</dd>
            </div>
            <div class="proof-event__line">
                <dt>{{$t('components.vaccination.dateOfBirth')}}:</dt>
                <dd>{{holder.birthDateString}}</dd>
            </div>
        </dl>

        <button
            @click="openInfo()"
            type="button"
            class="info-button">
            <img src="assets/img/icons/info.svg" alt=""/>
        </button>

        <RecoveryInfo
            v-if="showInfo"
            @close="closeInfo"
            :signed-event="signedEvent"/>
    </div>
</template>

<style lang="scss"></style>
