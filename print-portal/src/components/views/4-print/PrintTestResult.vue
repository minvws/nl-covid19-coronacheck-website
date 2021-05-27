<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';
import PrintMixin from './print-mixin';

export default {
    name: 'PrintTestResult',
    components: { Print, PageIntro },
    mixins: [PrintMixin],
    computed: {
        qrCode() {
            return this.$store.state.qrCode;
        }
    },
    methods: {
        back() {
            this.$router.push({ name: 'YourTestResult' });
        }
    }
}
</script>

<template>
    <div class="PrintTestResult">
        <Print
            @back="back"
            :qr-code="qrCode"
            :document="document">
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
