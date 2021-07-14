<script>
import SlotModal from '@/components/elements/modal/SlotModal';
import SignedEvent from '@/classes/events/SignedEvent';

export default {
    name: 'VaccinationInfo',
    components: { SlotModal },
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
        data() {
            //         let dosesString;
            //         const vaccineType = this.$store.getters.getVaccineType(this.vaccination.type);
            //         const manufacturer = this.$store.getters.getVaccineManufacturer(this.vaccination.manufacturer);
            //         if (this.vaccination.doseNumber) {
            //     if (this.vaccination.totalDoses) {
            //         dosesString = this.vaccination.doseNumber + ' ' + this.$t('of') + ' ' + this.vaccination.totalDoses;
            //     } else {
            //         dosesString = this.vaccination.doseNumber;
            //     }
            // } else {
            //     dosesString = '';
            // }
            // const data = {
            //     name: this.holder.fullName,
            //     birthDateString: dateTool.dateToString(this.holder.birthDate, 'dd-MM-yyyy'),
            //     vaccineName: this.vaccineName,
            //     vaccineType: (vaccineType ? vaccineType.name : '-'),
            //     manufacturer: (manufacturer ? manufacturer.name : '-'),
            //     dosesString: dosesString,
            //     dateString: dateTool.dateToString(this.vaccination.date, 'dd-MM-yyyy'),
            //     country: this.vaccination.country,
            //     identificationCode: this.signedEvent.event.unique
            // }
            // this.$store.commit('modal/set', {
            //     messageHead: this.$t('message.info.vaccinationAbout.head'),
            //     messageBody: this.$t('message.info.vaccinationAbout.body', data),
            //     closeButton: true
            // })
            return null;
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
                Wat is er opgehaald
            </template>
            <template v-slot:body>
                Dit is er opgehaald
            </template>
        </SlotModal>
    </portal>
</template>
