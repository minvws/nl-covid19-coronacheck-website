<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';

export default {
    name: 'PrintNegativeTest',
    components: { Print, PageIntro },
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
            :type="'negativeTest'"
            @back="back">
            <PageIntro
                :head="$t('views.PrintNegativeTest.pageHeader')"
                :intro="$t('views.PrintNegativeTest.pageIntro')"/>
        </Print>
    </div>
</template>
