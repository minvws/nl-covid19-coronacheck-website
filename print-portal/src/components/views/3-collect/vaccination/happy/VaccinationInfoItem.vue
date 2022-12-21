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
        issuer() {
            return this.signedEvent.event.issuer;
        },
        vaccineInfo() {
            return this.$store.getters.getVaccineInfo(this.vaccination.hpkCode);
        },
        vaccineDisplayName () {
            return this.vaccineInfo?.displayName
        },
        vaccineBrand() {
            if (this.vaccineInfo) {
                return this.vaccineInfo.name;
            } else {
                if (this.vaccination.brand.length > 0) {
                    const brand = this.$store.getters.getEuBrand(this.vaccination.brand);
                    return brand ? brand.name : ''
                } else {
                    return '';
                }
            }
        },
        vaccineType() {
            const typeCode = this.vaccineInfo ? this.vaccineInfo.vp : this.vaccination.type;
            const vaccineType = this.$store.getters.getVaccineType(typeCode);
            return vaccineType ? vaccineType.name : '';
        },
        vaccineManufacturer() {
            const manufacturerCode = this.vaccineInfo ? this.vaccineInfo.ma : this.vaccination.manufacturer;
            const manufacturer = this.$store.getters.getVaccineManufacturer(manufacturerCode);
            return manufacturer ? manufacturer.name : '';
        },
        dosesString() {
            if (this.vaccination.doseNumber.length > 0 && this.vaccination.totalDoses.length > 0) {
                return this.vaccination.doseNumber + ' ' + this.$t('of') + ' ' + this.vaccination.totalDoses;
            } else {
                if (this.vaccination.doseNumber.length > 0) {
                    return this.vaccination.doseNumber;
                } else {
                    return '? ' + this.$t('of') + ' ' + this.vaccination.totalDoses;
                }
            }
        },
        showDosesString() {
            return this.vaccination.doseNumber.length > 0 && this.vaccination.totalDoses.length > 0;
        },
        isCompleted() {
            return this.vaccination.completedByMedicalStatement === true || this.vaccination.completedByPersonalStatement === true;
        },
        finalDosisString() {
            const isNotCompleted = () => {
                // mind completedByMedicalStatement, completedByPersonalStatement can be null.
                // So this is not the same as !isCompleted()
                return !this.isCompleted && (this.vaccination.completedByMedicalStatement === false || this.vaccination.completedByPersonalStatement === false)
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

            if (this.isCompleted && reasonIsMissing()) {
                return this.$t('components.vaccination.info.finalDosisValue.yes');
            } else if (this.isCompleted && reasonIsRecovery()) {
                return this.$t('components.vaccination.info.finalDosisValue.recovery');
            } else if (this.isCompleted && reasonIsPriorEvent()) {
                return this.$t('components.vaccination.info.finalDosisValue.prior');
            } else if (isNotCompleted()) {
                return this.$t('components.vaccination.info.finalDosisValue.no');
            } else {
                return this.$t('components.vaccination.info.finalDosisValue.unknown');
            }
        },
        vaccinationDate() {
            return dateTool.dateToString(this.vaccination.date, 'date-without-day', this.currentLanguage.locale);
        },
        vaccinationCountry() {
            return this.issuer || this.vaccination.country;
        },
        identificationCode() {
            return this.signedEvent.event.unique;
        },
        providerName() {
            if (this.signedEvent.providerIdentifier) {
                const providerIdentifier = this.$store.getters['eventProviders/getTestProviderByIdentifier'](this.signedEvent.providerIdentifier);
                return providerIdentifier ? providerIdentifier.name : '';
            } else {
                return '';
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
                        {{vaccineBrand}}
                    </dd>
                </div>
                <div class="dl__row" v-if="vaccineDisplayName">
                    <dt>
                        {{$t('components.vaccination.info.displayName')}}:
                    </dt>
                    <dd>
                        {{ vaccineDisplayName }}
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
                <div
                    v-if="showDosesString"
                    class="dl__row">
                    <dt>
                        {{$t('components.vaccination.info.doses')}}:
                    </dt>
                    <dd>
                        {{dosesString}}
                    </dd>
                </div>
                <div
                    v-if="isCompleted"
                    class="dl__row">
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
                <div
                    v-if="vaccinationCountry.length > 0"
                    class="dl__row">
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
                        {{$t('components.vaccination.info.identificationCode')}}:<br>
                    </dt>
                    <dd class="word-wrap">
                        {{identificationCode}}
                    </dd>
                </div>
            </div>
        </dl>
    </div>
</template>
