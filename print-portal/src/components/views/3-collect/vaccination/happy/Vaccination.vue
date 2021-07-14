<script>
import dateTool from '@/tools/date';
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import VaccinationInfo from './VaccinationInfo';

export default {
    name: 'Vaccination',
    components: { VaccinationInfo },
    mixins: [proofEventMixin],
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    data() {
        return {
            showInfo: false
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
    },
    methods: {
        openInfo() {
            this.showInfo = true;
        },
        closeInfo() {
            this.showInfo = false;
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
                <dt>{{$t('components.vaccination.name')}}:</dt>
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
            <img src="assets/img/icons/info.svg" :alt="$t('message.info.vaccinationAbout.head')" />
        </button>

        <VaccinationInfo
            v-if="showInfo"
            @close="closeInfo"
            :signed-event="signedEvent"
            :holder="holder"/>
    </div>
</template>

<style lang="scss">
</style>
