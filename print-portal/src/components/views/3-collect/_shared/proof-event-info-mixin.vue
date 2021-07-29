<script>
export default {
    name: 'proof-event-info-mixin',
    computed: {
        holder() {
            return this.signedEvent.holder;
        },
        birthDateString() {
            return this.holder.birthDateString;
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
