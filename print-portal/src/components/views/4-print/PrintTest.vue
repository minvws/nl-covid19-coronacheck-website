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
                :head="'PDFs gemaakt!'"
                :intro="'<p>Van jouw vaccinatie zijn 2 bewijzen gemaakt: een voor in Nederland en een voor het buitenland.</p><p>Open de PDFs en print ze uit. Neem ze mee naar de plek die je bezoekt of naar het land waar je heen reist.</p>'"/>
        </Print>
    </div>
</template>
