<script>
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import NegativeTestInfo from './NegativeTestInfo';

export default {
    name: 'NegativeTest',
    components: { NegativeTestInfo },
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
            <strong>{{$t('components.NegativeTest.resultNegative')}}</strong>
        </div>
        <div
            v-if="proofEvent.protocolVersion === '2.0'"
            class="proof-event__wrapper">
            <dl>
                <div class="proof-event__line">
                    <dt>{{$t('components.proofEvent.dateOfTest')}}:</dt>
                    <dd>{{dateOfTest}}</dd>
                </div>
                <div class="proof-event__line">
                    <dt>{{$t('components.NegativeTest.yourCredentials')}}:</dt>
                    <dd>{{holder.discreteInfoString}}</dd>
                </div>
            </dl>

        </div>
        <div
            v-if="proofEvent.protocolVersion === '3.0'"
            class="proof-event__wrapper">
            <dl>
                <div class="proof-event__line">
                    <dt>{{$t('components.proofEvent.dateOfTest')}}:</dt>
                    <dd>{{dateOfTest}}</dd>
                </div>
                <div class="proof-event__line">
                    <dt>{{$t('components.proofEvent.name')}}:</dt>
                    <dd>{{holder.fullName}}</dd>
                </div>
                <div class="proof-event__line">
                    <dt>{{$t('components.proofEvent.dateOfBirth')}}:</dt>
                    <dd>{{holder.birthDateString}}</dd>
                </div>
            </dl>
        </div>

        <button
            @click="openInfo()"
            type="button"
            class="info-button"
            >
            <img src="assets/img/icons/info.svg" :alt="$t('message.info.testResultAbout.head')"/>
        </button>

        <NegativeTestInfo
            v-if="showInfo"
            @close="closeInfo"
            :signed-event="signedEvent"/>
    </div>
</template>
