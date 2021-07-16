<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';
import dateTool from '@/tools/date';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'

export default {
    name: 'VaccinationInfo',
    components: { SlotModal },
    mixins: [proofEventInfoMixin],
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
                return !isCompleted() && (this.vaccination.completedByMedicalStatement === false || this.vaccination.completedByPersonalStatement === false)
            }
            //
            // const isUnknown = () => {
            //     return this.vaccination.completedByMedicalStatement === null && this.vaccination.completedByPersonalStatement === null;
            // }

            const reasonIsRecovery = () => {
                return this.vaccination.completionReason === 'recovery';
            }

            const reasonIsPriorEvent = () => {
                return this.vaccination.completionReason === 'priorevent';
            }

            const reasonIsMissing = () => {
                return this.vaccination.completionReason === '';
            }

            if (isCompleted() && reasonIsMissing()) {
                return this.$t('components.vaccination.info.finalDosisValue.yes');
            } else if (isCompleted() && reasonIsRecovery()) {
                return this.$t('components.vaccination.info.finalDosisValue.recovery');
            } else if (isCompleted() && reasonIsPriorEvent()) {
                return this.$t('components.vaccination.info.finalDosisValue.prior');
            } else if (isNotCompleted()) {
                return this.$t('components.vaccination.info.finalDosisValue.no');
            } else {
                return this.$t('components.vaccination.info.finalDosisValue.unknown');
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
    }
}
</script>

<template>
    <portal to="root">
        <SlotModal @close="close">
            <template v-slot:head>
                {{$t('components.eventInfo.head')}}
            </template>
            <template v-slot:body>
                <p>
                    {{$t('components.vaccination.info.detailsRetrieved')}}:
                </p>
                <p>
                    {{$t('components.eventInfo.name')}}:
                    <strong>{{holder.fullName}}</strong><br>
                    {{$t('components.eventInfo.dateOfBirth')}}:
                    <strong>{{birthDateString}}</strong>
                </p>
                <p>
                    {{$t('components.vaccination.info.pathogen')}}:
                    <strong>COVID-19</strong><br>
                    {{$t('components.vaccination.info.vaccine')}}:
                    <strong>{{vaccineName}}</strong><br>
                    {{$t('components.vaccination.info.vaccineType')}}:
                    <strong>{{vaccineType}}</strong><br>
                    {{$t('components.vaccination.info.manufacturer')}}:
                    <strong>{{vaccineManufacturer}}</strong><br>
                    {{$t('components.vaccination.info.doses')}}:
                    <strong>{{dosesString}}</strong><br>
                    {{$t('components.vaccination.info.finalDosis')}}
                    <strong>{{finalDosisString}}</strong><br>
                    {{$t('components.vaccination.info.vaccinationDate')}}:
                    <strong>{{vaccinationDate}}</strong><br>
                    {{$t('components.vaccination.info.vaccinationCountry')}}:
                    <strong>{{vaccinationCountry}}</strong>
                </p>
                <p>
                    {{$t('components.eventInfo.identificationCode')}}:<br>
                    <strong>{{identificationCode}}</strong>
                </p>
            </template>
        </SlotModal>
    </portal>
</template>
