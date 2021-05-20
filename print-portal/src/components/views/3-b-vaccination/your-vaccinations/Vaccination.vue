<script>
import ProofEvent from '@/classes/events/ProofEvent';

export default {
    name: 'Vaccination',
    components: {},
    props: {
        proofEvent: {
            type: ProofEvent,
            required: true,
            validator: function (value) {
                return value.type === 'vaccination' && value.value !== null;
            }
        }
    },
    computed: {
        vaccination() {
            return this.proofEvent.vaccination;
        },
        holder() {
            return this.$store.state.holder;
        },
        title() {
            return this.$t('orderWords.' + (this.vaccination.doseNumber - 1)) + ' ' + this.$t('vaccination').toLocaleLowerCase();
        },
        vaccineName() {
            const vaccine = this.$store.state.holderConfig.hpkCodes.find(hpkCode => {
                // todo temp stringify this, will be fixed by Nick
                return String(hpkCode.code) === this.vaccination.hpkCode;
            })
            return vaccine ? vaccine.name : ''
        }
    },
    methods: {
        openModalVaccinationAbout() {
            const data = {
                discreteInfoString: this.holder.discreteInfoString,
                fullName: this.holder.fullName,
                birthDate: this.holder.birthDateString,
                vaccin: this.vaccineName
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.vaccinationAbout.head'),
                messageBody: this.$t('message.info.vaccinationAbout.body', data),
                closeButton: true
            })
        }
    }
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status">
            {{title}}
        </div>
        <div class="proof-event__date">
            {{$t('name')}}: {{holder.fullName}}
        </div>
        <div class="proof-event__date">
            {{$t('dateOfBirth')}}: {{holder.birthDateString}}
        </div>

        <button
            @click="openModalVaccinationAbout()"
            type="button"
            class="info-button">
            <img src="assets/img/icons/info.svg" alt=""/>
        </button>
    </div>
</template>

<style lang="scss">
.Vaccination {

}
</style>
