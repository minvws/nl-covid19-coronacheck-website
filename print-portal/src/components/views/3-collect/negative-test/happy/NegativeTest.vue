<script>
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import NegativeTestInfo from './NegativeTestInfo';
import InfoButton from '@/components/views/3-collect/_shared/InfoButton';

export default {
    name: 'NegativeTest',
    components: { NegativeTestInfo, InfoButton },
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
        <div class="proof-event__line">
            <h2>{{$t('components.test.resultNegative')}}</h2>
        </div>
        <dl>
            <div class="proof-event__line">
                <dt>{{$t('components.eventInfo.dateOfTest')}}:</dt>
                <dd>{{dateOfTest}}</dd>
            </div>
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

        <NegativeTestInfo
            v-if="showInfo"
            @close="closeInfo"
            :signed-event="signedEvent"/>
    </div>
</template>
