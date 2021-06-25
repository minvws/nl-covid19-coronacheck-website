<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'PrintTestResult',
    components: { Print, PageIntro },
    methods: {
        back() {
            this.$router.push({ name: 'NegativeTestOverview' });
        }
    }
}
</script>

<template>
    <div class="PrintTestResult">
        <Print
            :type="'negativeTest'"
            @back="back">
            <PageIntro
                :head="$t('views.printTestResult.pageHeader')"
                :intro="$t('views.printTestResult.pageIntro')"/>
        </Print>
    </div>
</template>

<style lang="scss">
.PrintTestResult {

}
</style>
