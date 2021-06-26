<script>
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import SignedEvent from '@/classes/events/SignedEvent';

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
            console.log(this.proofEvent);
            // const testType = this.$store.getters.getEuTestType(this.proofEvent.type);
            // const manufacturer = this.$store.getters.getTestManufacturer(this.proofEvent.manufacturer);
            // const dataForV3 = {
            //     name: this.holder.fullName,
            //     birthDateString: this.holder.birthDateString,
            //     testType: (testType ? testType.name : this.$t('unknown')),
            //     testName: (this.proofEvent.name.length ? this.proofEvent.name : this.$t('unknown')),
            //     testLocation: this.proofEvent.facility,
            //     sampleDate: this.dateOfTest,
            //     manufacturer: manufacturer ? manufacturer.name : this.$t('unknown'),
            //     identificationCode: this.signedEvent.event.unique,
            //     country: this.proofEvent.country
            // }
            // this.$store.commit('modal/set', {
            //     messageHead: this.$t('message.info.testResultAbout.head'),
            //     messageBody: this.$t('message.info.testResultAbout.bodyV3', dataForV3),
            //     closeButton: true
            // })
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status proof-event__line">
            {{$t('components.recovery.title')}}
        </div>
        <div class="proof-event__line">
            {{$t('components.proofEvent.dateOfTest')}}: {{dateOfTest}}
        </div>
        <div class="proof-event__line">
            {{$t('components.proofEvent.name')}}: {{holder.fullName}}
        </div>
        <div class="proof-event__line">
            {{$t('components.vaccination.dateOfBirth')}}: {{holder.birthDateString}}
        </div>

        <button
            @click="openInfo()"
            type="button"
            class="info-button">
            <img src="assets/img/icons/info.svg" alt=""/>
        </button>
    </div>
</template>

<style lang="scss"></style>
