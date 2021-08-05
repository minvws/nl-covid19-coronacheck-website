<script>
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import NegativeTestV2Info from './NegativeTestV2Info';
import InfoButton from '@/components/views/3-collect/_shared/InfoButton';

export default {
    name: 'NegativeTestV2',
    components: { NegativeTestV2Info, InfoButton },
    mixins: [proofEventMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.negativetest;
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status proof-event__line">
            <strong>{{$t('components.test.resultNegative')}}</strong>
        </div>
        <dl>
            <div class="proof-event__line">
                <dt>{{$t('components.eventInfo.dateOfTest')}}:</dt>
                <dd>{{dateOfTest}}</dd>
            </div>
            <div class="proof-event__line">
                <dt>{{$t('components.test.yourCredentials')}}:</dt>
                <dd>{{holder.discreteInfoString}}</dd>
            </div>
        </dl>

        <InfoButton
            @select="openInfo"
            :showInfo="showInfo"/>

        <NegativeTestV2Info
            v-if="showInfo"
            @close="closeInfo"
            :signed-event="signedEvent"/>
    </div>
</template>
