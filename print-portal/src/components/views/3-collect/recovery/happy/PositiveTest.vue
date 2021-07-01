<script>
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import SignedEvent from '@/classes/events/SignedEvent';

export default {
    name: 'PositiveTest',
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
            return this.signedEvent.event.positivetest;
        }
    },
    methods: {
        openInfo() {
            const testType = this.$store.getters.getEuTestType(this.proofEvent.type);
            const manufacturer = this.$store.getters.getTestManufacturer(this.proofEvent.manufacturer);
            const data = {
                name: this.holder.fullName,
                birthDateString: this.holder.birthDateString,
                testType: (testType ? testType.name : this.$t('unknown')),
                testName: (this.proofEvent.name.length ? this.proofEvent.name : this.$t('unknown')),
                testLocation: this.proofEvent.facility,
                sampleDate: this.dateOfTest,
                manufacturer: manufacturer ? manufacturer.name : this.$t('unknown'),
                identificationCode: this.signedEvent.event.unique,
                country: this.proofEvent.country
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.positiveTestResultAbout.head'),
                messageBody: this.$t('message.info.positiveTestResultAbout.body', data),
                closeButton: true
            })
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status proof-event__line">
            {{$t('components.positiveTest.title')}}
        </div>

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
