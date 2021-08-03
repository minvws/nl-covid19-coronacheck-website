<script>
import dateTool from '@/tools/date';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import VaccinationInfo from './VaccinationInfo';
import InfoButton from '@/components/views/3-collect/_shared/InfoButton';

export default {
    name: 'Vaccination',
    components: { InfoButton, VaccinationInfo },
    mixins: [proofEventMixin],
    props: {
        signedEventSet: {
            type: Array,
            required: true
        }
    },
    computed: {
        signedEvent() {
            // return the first of the set. If GGD is in the set, this will be GGD, which is prefered for
            // holder info
            return this.signedEventSet[0];
        },
        monthName() {
            return dateTool.dateToMonthName(this.signedEvent.event.vaccination.date, this.$store.state.languages.current.locale);
        },
        eventsFetchedAt() {
            const locationList = this.signedEventSet.map(signedEvent => {
                if (signedEvent.providerIdentifier) {
                    const providerIdentifier = this.$store.getters['eventProviders/getTestProviderByIdentifier'](signedEvent.providerIdentifier);
                    return providerIdentifier ? providerIdentifier.name : '-';
                } else {
                    return '-';
                }
            })
            return locationList.join(' ' + this.$t('and').toLocaleLowerCase() + ' ')
        },
        title() {
            return this.$t('components.vaccination.vaccination') + ' ' + this.monthName;
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
            <div class="proof-event__line">
                <dt>{{$t('components.eventInfo.eventsFetchedAt')}}:</dt>
                <dd>{{eventsFetchedAt}}</dd>
            </div>
        </dl>

        <InfoButton
            @select="openInfo"
            :showInfo="showInfo"/>

        <VaccinationInfo
            v-if="showInfo"
            @close="closeInfo"
            :signed-event-set="signedEventSet"/>
    </div>
</template>

<style lang="scss">
</style>
