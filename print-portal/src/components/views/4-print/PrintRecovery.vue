<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'PrintRecovery',
    components: { Print, PageIntro },
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
                :head="$t('views.printRecovery.pageHeader')"
                :intro="$t('views.printRecovery.pageIntro')"/>
        </Print>
    </div>
</template>
