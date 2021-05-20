<script>
import ProofEvent from '@/classes/events/ProofEvent';

export default {
    name: 'Vaccination',
    components: {},
    props: {
        proofEvent: {
            type: ProofEvent,
            required: true,
            validator: function (value) {
                return value.type === 'vaccination' && value.value !== null;
            }
        }
    },
    computed: {
        vaccination() {
            return this.proofEvent.vaccination;
        },
        holder() {
            return this.$store.state.holder;
        },
        title() {
            return this.$t('orderWords.' + (this.vaccination.doseNumber - 1)) + ' ' + this.$t('vaccination').toLocaleLowerCase();
        }
    },
    methods: {}
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status">
            {{title}}
        </div>
        <div class="proof-event__date">
            {{$t('name')}}: {{holder.fullName}}
        </div>
        <div class="proof-event__date">
            {{$t('dateOfBirth')}}: {{holder.birthDateString}}
        </div>
    </div>
</template>

<style lang="scss">
.Vaccination {

}
</style>
