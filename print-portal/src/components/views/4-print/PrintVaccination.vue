<script>
import Print from './Print';

export default {
    name: 'PrintVaccination',
    components: { Print },
    methods: {
        back() {
            this.$router.push({ name: 'VaccinationOverview' });
        }
    }
}
</script>

<template>
    <div class="PrintVaccination">
        <Print
            @back="back"
            :type="'vaccination'">
        </Print>
    </div>
</template>
