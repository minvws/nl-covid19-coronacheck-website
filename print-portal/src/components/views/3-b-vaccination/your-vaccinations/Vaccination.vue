<script>
import ProofEvent from '@/classes/events/ProofEvent';
import dateTool from '@/tools/date';

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
            return this.$t('orderWords.' + (this.vaccination.doseNumber - 1)) + ' ' + this.$t('components.vaccination.vaccination').toLocaleLowerCase();
        },
        vaccineName() {
            let vaccine;
            if (this.vaccination.hpkCode.length > 0) {
                vaccine = this.$store.state.holderConfig.hpkCodes.find(hpkCode => {
                    // todo temp stringify this, will be fixed by Nick
                    return String(hpkCode.code) === this.vaccination.hpkCode;
                })
            } else if (this.vaccination.brand.length > 0) {
                vaccine = this.$store.state.holderConfig.euBrands.find(euBrand => {
                    return euBrand.code === this.vaccination.brand;
                })
            }
            return vaccine ? vaccine.name : ''
        }
    },
    methods: {
        openModalVaccinationAbout() {
            const data = {
                name: this.holder.fullName,
                birthDateString: this.holder.birthDateString,
                vaccineName: this.vaccineName,
                manufacturer: this.vaccination.manufacturer,
                doseNumber: this.vaccination.doseNumber,
                totalDoses: this.vaccination.totalDoses,
                dateString: dateTool.dateToString(this.vaccination.date, 'EEEE d LLLL', this.currentLanguage.locale),
                country: this.vaccination.country
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
        <div class="proof-event__line">
            {{$t('components.vaccination.name')}}: {{holder.fullName}}
        </div>
        <div class="proof-event__line">
            {{$t('components.vaccination.dateOfBirth')}}: {{holder.birthDateString}}
        </div>

        <button
            @click="openModalVaccinationAbout()"
            type="button"
            class="info-button">
            <img src="assets/img/icons/info.svg" alt=""/>
        </button>
    </div>
</template>

<style lang="scss"></style>
