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
        }
    }
}
</script>
