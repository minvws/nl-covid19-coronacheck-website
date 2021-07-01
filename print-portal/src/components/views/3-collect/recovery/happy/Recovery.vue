<script>
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import SignedEvent from '@/classes/events/SignedEvent';
import dateTool from '@/tools/date';

export default {
    name: 'Recovery',
    components: {},
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
    },
    methods: {
        openInfo() {
            const testDate = dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
            const validFrom = dateTool.dateTimeToString(this.proofEvent.validFrom, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
            const validUntil = dateTool.dateTimeToString(this.proofEvent.validUntil, 'EEEE d LLLL yyyy', this.currentLanguage.locale);
            const data = {
                name: this.holder.fullName,
                birthDateString: this.holder.birthDateString,
                testDate,
                validFrom,
                validUntil,
                identificationCode: this.signedEvent.event.unique
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.recoveryAbout.head'),
                messageBody: this.$t('message.info.recoveryAbout.body', data),
                closeButton: true
            })
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
    </div>
</template>

<style lang="scss"></style>
