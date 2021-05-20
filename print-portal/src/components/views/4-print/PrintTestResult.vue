<script>
import Print from './Print';
import PrintMixin from './print-mixin';

export default {
    name: 'PrintTestResult',
    components: { Print },
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
            <h2>
                {{$t('views.printTestResult.pageHeader')}}
            </h2>
            <div v-html="$t('views.printTestResult.pageIntro')"/>
        </Print>
    </div>
</template>

<style lang="scss">
.PrintTestResult {

}
</style>
