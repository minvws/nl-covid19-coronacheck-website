<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';
import printMixin from './print-mixin';
import proof from './mock';

export default {
    name: 'PrintTest',
    components: { Print, PageIntro },
    mixins: [printMixin],
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
    <div
        v-if="proof"
        class="PrintTest">
        <Print
            @back="back"
            :type="'vaccination'">
            <PageIntro
                :head="'Kop test'"
                :intro="'Copy test'"/>
        </Print>
    </div>
</template>
