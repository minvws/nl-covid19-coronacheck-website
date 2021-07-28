<script>
import dateTool from '@/tools/date';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'
import SignedEvent from '@/classes/events/SignedEvent';

export default {
    name: 'VaccinationInfoItem',
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
        },
        providerName() {
            if (this.signedEvent.providerIdentifier) {
                const providerIdentifier = this.$store.getters['eventProviders/getTestProviderByIdentifier'](this.signedEvent.providerIdentifier);
                return providerIdentifier ? providerIdentifier.name : '-';
            } else {
                return '-';
            }
        }
    }
}
</script>

<template>
    <div class="proof-event-info-item">
        <p>
            {{$t('components.vaccination.info.detailsRetrieved', { provider: providerName })}}:
        </p>
        <dl>
            <div class="dl__section">
                <div class="dl__row">
                    <dt>
                        {{$t('components.eventInfo.name')}}:
                    </dt>
                    <dd>
                        {{holder.fullName}}
                    </dd>
                </div>
                <div class="dl__row">
                    <dt>
                        {{$t('components.eventInfo.dateOfBirth')}}:
                    </dt>
                    <dd>
                        {{birthDateString}}
                    </dd>
                </div>
            </div>
            <div class="dl__section">
                <div class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.pathogen')}}:
                    </dt>
                    <dd>
                        COVID-19
                    </dd>
                </div>
                <div class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.vaccine')}}:
                    </dt>
                    <dd>
                        {{vaccineName}}
                    </dd>
                </div>
                <div class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.vaccineType')}}:
                    </dt>
                    <dd>
                        {{vaccineType}}
                    </dd>
                </div>
                <div class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.manufacturer')}}:
                    </dt>
                    <dd>
                        {{vaccineManufacturer}}
                    </dd>
                </div>
                <div class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.doses')}}:
                    </dt>
                    <dd>
                        {{dosesString}}
                    </dd>
                </div>
                <div class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.finalDosis')}}
                    </dt>
                    <dd>
                        {{finalDosisString}}
                    </dd>
                </div>
                <div class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.vaccinationDate')}}:
                    </dt>
                    <dd>
                        {{vaccinationDate}}
                    </dd>
                </div>
                <div class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.vaccinationCountry')}}:
                    </dt>
                    <dd>
                        {{vaccinationCountry}}
                    </dd>
                </div>
            </div>
            <div class="dl__section">
                <div class="dl__row">
                    <dt>
                        {{$t('components.eventInfo.identificationCode')}}:<br>
                    </dt>
                    <dd>
                        {{identificationCode}}
                    </dd>
                </div>
            </div>
        </dl>
    </div>
</template>
