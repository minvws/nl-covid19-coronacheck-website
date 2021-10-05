<script>
import Print from './Print';
import proof from './mock';

export default {
    name: 'PrintTest',
    components: { Print },
    methods: {
        back() {
            this.$router.push({ name: 'VaccinationOverview' });
        }
    },
    computed: {
        proof() {
            return this.$store.state.qrs.proof;
        }
    },
    mounted() {
        this.$store.commit('qrs/add', proof);
    }
}
</script>

<template>
    <div class="PrintTest">
        <Print
            v-if="proof"
            @back="back"
            :type="'vaccination'">
        </Print>
    </div>
</template>
