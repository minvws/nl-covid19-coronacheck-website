<script>
import dateTool from '@/tools/date';

export default {
    name: 'proof-event-mixin',
    data() {
        return {
            showInfo: false
        }
    },
    computed: {
        holder() {
            return this.signedEvent.holder;
        },
        dateOfTest() {
            return dateTool.dateToString(this.proofEvent.sampleDate, 'datetime-with-year-and-day', this.currentLanguage.locale);
        }
    },
    methods: {
        openInfo() {
            this.showInfo = true;
            this.$store.commit('setSlotModalActivity', true);
        },
        closeInfo() {
            this.showInfo = false;
            this.$store.commit('setSlotModalActivity', false);
        }
    }
}
</script>
