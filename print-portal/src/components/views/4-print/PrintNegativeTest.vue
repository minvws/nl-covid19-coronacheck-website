<script>
import Print from './Print';

export default {
    name: 'PrintNegativeTest',
    components: { Print },
    props: {
        exclude: {
            type: String,
            required: false
        }
    },
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
            :exclude="exclude"
            :type="'negativetest'">
        </Print>
    </div>
</template>
