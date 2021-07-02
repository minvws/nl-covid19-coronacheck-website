<script>
import dateTool from '@/tools/date';
import SignedEvent from '@/classes/events/SignedEvent';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'

export default {
    name: 'Vaccination',
    components: {},
    mixins: [proofEventMixin],
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
        monthName() {
            return dateTool.dateToString(this.vaccination.date, 'MMMM');
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
        },
        vaccineName() {
            let vaccine;
            console.log(this.vaccination);
            if (this.vaccination.hpkCode.length > 0) {
                vaccine = this.$store.state.holderConfig.hpkCodes.find(hpkCode => {
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
        openInfo() {
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
            {{title}}
        </div>
        <div class="proof-event__line">
            {{$t('components.vaccination.name')}}: {{holder.fullName}}
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
