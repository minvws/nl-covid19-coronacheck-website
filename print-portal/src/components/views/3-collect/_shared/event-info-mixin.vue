<script>
import dateTool from '@/tools/date';

export default {
    name: 'event-info-mixin',
    computed: {
        holder() {
            return this.signedEvent.holder;
        },
        birthDateString() {
            return dateTool.dateToString(this.holder.birthDate, 'dd-MM-yyyy');
        },
        identificationCode() {
            return this.signedEvent.event.unique;
        },
        sampleDate() {
            return dateTool.dateTimeToString(this.proofEvent.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        }
    }
}
</script>
