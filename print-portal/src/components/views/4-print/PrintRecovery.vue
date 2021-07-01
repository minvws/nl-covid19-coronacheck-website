<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';
import printMixin from './print-mixin';

export default {
    name: 'PrintRecovery',
    components: { Print, PageIntro },
    mixins: [printMixin],
    methods: {
        back() {
            this.$router.push({ name: 'RecoveryOverview' });
        }
    }
}
</script>

<template>
    <div class="PrintRecovery">
        <Print
            @back="back"
            :type="'recovery'">
            <PageIntro
                :head="$t('views.printRecovery.' + pageType + '.pageHeader')"
                :intro="$t('views.printRecovery.' + pageType + '.pageIntro')"/>
        </Print>
    </div>
</template>
