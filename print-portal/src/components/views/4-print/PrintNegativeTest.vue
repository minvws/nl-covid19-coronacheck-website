<script>
import Print from './Print';

export default {
    name: 'PrintNegativeTest',
    components: { Print },
    methods: {
        back() {
            this.$router.push({ name: 'NegativeTestOverview' });
        }
    }
}
</script>

<template>
    <div class="PrintNegativeTest">
        <Print
            @back="back"
            :type="'negativetest'">
        </Print>
    </div>
</template>
