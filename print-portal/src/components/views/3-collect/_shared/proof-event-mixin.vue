<script>
import dateTool from '@/tools/date';

export default {
    name: 'proof-event-mixin',
    computed: {
        holder() {
            return this.signedEvent.holder;
        },
        dateOfTest() {
            return dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        }
    }
}
</script>
