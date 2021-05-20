<script>
import Print from './Print';
import PrintMixin from './print-mixin';

export default {
    name: 'PrintVaccination',
    components: { Print },
    mixins: [PrintMixin],
    computed: {
        qrCode() {
            // todo
            return 'XXXX';
        }
    },
    methods: {
        back() {
            this.$router.push({ name: 'YourVaccinations' });
        }
    }
}
</script>

<template>
    <div class="PrintVaccination">
        <Print
            @back="back"
            :qr-code="qrCode"
            :document="document">
            <h2>
                {{$t('views.printVaccination.pageHeader')}}
            </h2>
            <div v-html="$t('views.printVaccination.pageIntro')"/>
        </Print>
    </div>
</template>

<style lang="scss">
.PrintVaccination {

}
</style>
