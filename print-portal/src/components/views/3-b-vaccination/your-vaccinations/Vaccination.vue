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
        }
    },
    methods: {}
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status">
            {{vaccination.doseNumber}}
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
