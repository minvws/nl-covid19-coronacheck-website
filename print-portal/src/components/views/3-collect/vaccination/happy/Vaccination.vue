<script>
import dateTool from '@/tools/date';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import VaccinationInfo from './VaccinationInfo';
import InfoButton from '@/components/views/3-collect/_shared/InfoButton';
import { getDCCProvider } from '@/qr/utils/DCCDecoder'

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
        date () {
            return dateTool.dateToString(this.signedEvent.event.vaccination.date, 'date-without-day', this.currentLanguage.locale)
        },
        eventsAddedByQR () {
            return !!this.signedEventSet.find(signedEvent => getDCCProvider(signedEvent.providerIdentifier))
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
            return this.$t('components.vaccination.vaccination')
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__line">
            <h2>{{title}}</h2>
        </div>
        <dl>
            <div class="proof-event__line">
                <dt>{{$t('components.vaccination.info.vaccinationDate')}}:</dt>
                <dd>{{date}}</dd>
            </div>
            <div class="proof-event__line">
                <dt>{{$t('components.eventInfo.name')}}:</dt>
                <dd>{{holder.fullName}}</dd>
            </div>
            <div class="proof-event__line">
                <dt>{{$t('components.eventInfo.dateOfBirth')}}:</dt>
                <dd>{{holder.birthDateString}}</dd>
            </div>
            <div class="proof-event__line">
                  <template v-if="eventsAddedByQR">
                     <dt>{{$t('components.eventInfo.eventsAddedByQR')}}</dt>
                </template>
                <template v-else>
                    <dt>{{$t('components.eventInfo.eventsFetchedAt')}}:</dt>
                    <dd>{{eventsFetchedAt}}</dd>
                </template>
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
