<script>
import dateTool from '@/tools/date';
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import VaccinationInfo from './VaccinationInfo';
import InfoButton from '@/components/views/3-collect/_shared/InfoButton';

export default {
    name: 'Vaccination',
    components: { InfoButton, VaccinationInfo },
    mixins: [proofEventMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        monthName() {
            return dateTool.dateToString(this.signedEvent.event.vaccination.date, 'MMMM');
        },
        location() {
            if (this.signedEvent.providerIdentifier) {
                const providerIdentifier = this.$store.getters['eventProviders/getTestProviderByIdentifier'](this.signedEvent.providerIdentifier);
                return providerIdentifier ? providerIdentifier.name : '-';
            } else {
                return '-';
            }
        },
        title() {
            return this.$t('components.vaccination.vaccination') + ' ' + this.monthName + ' (' + this.location + ')';
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status proof-event__line">
            <strong>{{title}}</strong>
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

        <VaccinationInfo
            v-if="showInfo"
            @close="closeInfo"
            :signed-event="signedEvent"/>
    </div>
</template>

<style lang="scss">
</style>
