<script>
import dateTool from '@/tools/date';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'

export default {
    name: 'test-info-mixin',
    mixins: [proofEventInfoMixin],
    data() {
        return {
            showInfo: false
        }
    },
    computed: {
        sampleDate() {
            return dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        },
        testType() {
            const testType = this.$store.getters.getNlTestType(this.proofEvent.testType)
            return testType ? testType.name : this.$t('unknown')
        },
        testName() {
            return this.proofEvent.name.length ? this.proofEvent.name : this.$t('unknown')
        },
        testLocation() {
            return this.proofEvent.facility;
        },
        testManufacturer() {
            const manufacturer = this.$store.getters.getTestManufacturer(this.proofEvent.manufacturer);
            return manufacturer ? manufacturer.name : this.$t('unknown');
        },
        testCountry() {
            return this.proofEvent.country;
        }
    }
}
</script>
