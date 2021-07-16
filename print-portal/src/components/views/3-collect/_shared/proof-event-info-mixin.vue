<script>
import dateTool from '@/tools/date';

export default {
    name: 'proof-event-info-mixin',
    computed: {
        holder() {
            return this.signedEvent.holder;
        },
        birthDateString() {
            return dateTool.dateToString(this.holder.birthDate, 'dd LLLL yyyy');
        },
        identificationCode() {
            return this.signedEvent.event.unique;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>
