<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';
import printMixin from './print-mixin';

export default {
    name: 'PrintVaccination',
    components: { Print, PageIntro },
    mixins: [printMixin],
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
            <PageIntro
                :head="$t('views.printVaccination.' + pageType + '.pageHeader')"
                :intro="$t('views.printVaccination.' + pageType + '.pageIntro')"/>
        </Print>
    </div>
</template>
