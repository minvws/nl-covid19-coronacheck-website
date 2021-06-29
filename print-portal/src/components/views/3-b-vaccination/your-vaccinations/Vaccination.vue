<script>
import dateTool from '@/tools/date';
import SignedEvent from '@/classes/events/SignedEvent';

export default {
    name: 'Vaccination',
    components: {},
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        }
    },
    computed: {
        vaccination() {
            return this.signedEvent.event.vaccination;
        },
        holder() {
            return this.signedEvent.holder;
        },
        monthName() {
            return dateTool.dateToString(this.vaccination.date, 'MMMM');
        },
        location() {
            const providerIdentifier = this.$store.getters['eventProviders/getTestProviderByIdentifier'](this.signedEvent.providerIdentifier);
            return providerIdentifier ? providerIdentifier.name : '-';
        },
        title() {
            return this.$t('components.vaccination.vaccination') + ' ' + this.monthName + ' (' + this.location + ')';
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
            let dosesString;
            const vaccineType = this.$store.getters.getVaccineType(this.vaccination.type);
            const manufacturer = this.$store.getters.getVaccineManufacturer(this.vaccination.manufacturer);
            if (this.vaccination.doseNumber) {
                if (this.vaccination.totalDoses) {
                    dosesString = this.vaccination.doseNumber + ' ' + this.$t('of') + ' ' + this.vaccination.totalDoses;
                } else {
                    dosesString = this.vaccination.doseNumber;
                }
            } else {
                dosesString = '';
            }
            const data = {
                name: this.holder.fullName,
                birthDateString: dateTool.dateToString(this.holder.birthDate, 'dd-MM-yyyy'),
                vaccineName: this.vaccineName,
                vaccineType: (vaccineType ? vaccineType.name : '-'),
                manufacturer: (manufacturer ? manufacturer.name : '-'),
                dosesString: dosesString,
                dateString: dateTool.dateToString(this.vaccination.date, 'dd-MM-yyyy'),
                country: this.vaccination.country,
                identificationCode: this.signedEvent.event.unique
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
        <div class="proof-event__status proof-event__line">
            <strong>{{title}}</strong>
        </div>
        <div class="proof-event__line">
            <dt>{{$t('components.vaccination.name')}}:</dt>
            <dd>{{holder.fullName}}</dd>
        </div>
        <div class="proof-event__line">
            <dt>{{$t('components.vaccination.dateOfBirth')}}:</dt>
            <dd>{{holder.birthDateString}}</dd>
        </div>

        <button
            @click="openModalVaccinationAbout()"
            type="button"
            class="info-button"
            >
            <img src="assets/img/icons/info.svg" :alt="$t('message.info.vaccinationAbout.head')" />
        </button>
    </div>
</template>

<style lang="scss"></style>
