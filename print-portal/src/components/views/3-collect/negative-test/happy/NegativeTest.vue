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
        },
        footer: {
            type: String,
            required: false
        }
    },
    computed: {
        proofEvent() {
            return this.signedEvent.event.negativetest;
        },
        providerIdentifier () {
            const { providerIdentifier } = this.signedEvent
            return this.$store.getters['eventProviders/getTestProviderByIdentifier'](providerIdentifier)?.name;
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
            <div class="proof-event__line" v-if="providerIdentifier">
                <dt>{{$t('components.eventInfo.eventsFetchedAt')}}:</dt>
                <dd>{{providerIdentifier}}</dd>
            </div>
        </dl>

        <InfoButton
            @select="openInfo"
            :showInfo="showInfo"/>

        <NegativeTestInfo
            v-if="showInfo"
            @close="closeInfo"
            :footer="footer"
            :signed-event="signedEvent"/>
    </div>
</template>
