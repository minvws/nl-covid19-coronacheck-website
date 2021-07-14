<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import _Holder from '@/classes/holder/_Holder';
import dateTool from '@/tools/date';

export default {
    name: 'VaccinationInfo',
    components: { SlotModal },
    props: {
        signedEvent: {
            type: SignedEvent,
            required: true
        },
        holder: {
            type: _Holder,
            required: true
        }
    },
    computed: {
        vaccination() {
            return this.signedEvent.event.vaccination;
        },
        birthDateString() {
            return dateTool.dateToString(this.holder.birthDate, 'dd-MM-yyyy');
        },
        vaccineName() {
            let vaccine;
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
        },
        vaccineType() {
            const vaccineType = this.$store.getters.getVaccineType(this.vaccination.type);
            return vaccineType ? vaccineType.name : '-';
        },
        vaccineManufacturer() {
            const manufacturer = this.$store.getters.getVaccineManufacturer(this.vaccination.manufacturer);
            return manufacturer ? manufacturer.name : '-';
        },
        dosesString() {
            if (this.vaccination.totalDoses) {
                return this.vaccination.doseNumber + ' ' + this.$t('of') + ' ' + this.vaccination.totalDoses;
            } else {
                return this.vaccination.doseNumber;
            }
        },
        finalDosisString() {
            const isCompleted = () => {
                return this.vaccination.completedByMedicalStatement === true || this.vaccination.completedByPersonalStatement === true;
            }

            const isNotCompleted = () => {
                // mind completedByMedicalStatement, completedByPersonalStatement can be null.
                // So this is not the same as !isCompleted()
                return this.vaccination.completedByMedicalStatement === false && this.vaccination.completedByPersonalStatement === false;
            }

            const isUnknown = () => {
                return this.vaccination.completedByMedicalStatement === null && this.vaccination.completedByPersonalStatement === null;
            }

            const reasonIsRecovery = () => {
                return this.vaccination.completionReason === '' || this.vaccination.completionReason === 'recovery';
            }

            const reasonIsPriorEvent = () => {
                return this.vaccination.completionReason === 'priorevent';
            }

            if (isCompleted() && reasonIsRecovery()) {
                return 'ja (eerder corona gehad)';
            } else if (isCompleted() && reasonIsPriorEvent()) {
                return 'ja (ergens anders gevaccineerd)';
            } else if (isNotCompleted()) {
                return 'nee';
            } else if (isUnknown()) {
                return 'niet bekend';
            } else {
                return '?';
            }
        },
        vaccinationDate() {
            return dateTool.dateToString(this.vaccination.date, 'dd-MM-yyyy');
        },
        vaccinationCountry() {
            return this.vaccination.country;
        },
        identificationCode() {
            return this.signedEvent.event.unique;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<template>
    <portal to="root">
        <SlotModal @close="close">
            <template v-slot:head>
                {{$t('message.info.vaccinationAbout.head')}}
            </template>
            <template v-slot:body>
                <div>
                    {{vaccination}}
                </div>
                <p>
                    Deze gegevens van je vaccinatie zijn opgehaald:
                </p>
                <p>
                    Naam: <strong>{{holder.fullName}}</strong><br>
                    Geboortedatum: <strong>{{birthDateString}}</strong>
                </p>
                <p>
                    Ziekteverwekker:
                    <strong>COVID-19</strong><br>
                    Vaccin:
                    <strong>{{vaccineName}}</strong><br>
                    Vaccin type:
                    <strong>{{vaccineType}}</strong><br>
                    Producent van het vaccin:
                    <strong>{{vaccineManufacturer}}</strong><br>
                    Doses:
                    <strong>{{dosesString}}</strong><br>
                    Is dit de laatste dosis van je vaccinatie?
                    <strong>{{finalDosisString}}</strong><br>
                    Prikdatum:
                    <strong>{{vaccinationDate}}</strong><br>
                    Gevaccineerd in:
                    <strong>{{vaccinationCountry}}</strong><br>
                    Uniek certificaatnummer:<br>
                    <strong>{{identificationCode}}</strong>
                </p>
            </template>
        </SlotModal>
    </portal>
</template>
