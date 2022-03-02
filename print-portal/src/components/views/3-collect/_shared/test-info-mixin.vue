<script>
import dateTool from '@/tools/date';
import proofEventInfoMixin from '@/components/views/3-collect/_shared/proof-event-info-mixin'
import { isRAT } from '@/types/proof-types'

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
            return dateTool.dateToString(this.proofEvent.sampleDate, 'datetime-with-day', this.currentLanguage.locale);
        },
        testType() {
            const testType = this.$store.getters.getEuTestType(this.proofEvent.type)
            return testType ? testType.name : this.$t('unknown')
        },
        testName() {
            const { name, type, manufacturer } = this.proofEvent
            if (isRAT(type)) {
                // see https://github.com/minvws/nl-covid19-coronacheck-website-private/issues/510
                const result = this.$store.getters.euTestName(manufacturer)
                if (result) return result
            }
            return name || this.$t('unknown')
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
