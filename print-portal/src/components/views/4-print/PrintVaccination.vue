<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';
import PrintMixin from './print-mixin';

export default {
    name: 'PrintVaccination',
    components: { Print, PageIntro },
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
            <PageIntro
                :head="$t('views.printVaccination.pageHeader')"
                :intro="$t('views.printVaccination.pageIntro')"/>
        </Print>
    </div>
</template>

<style lang="scss">
.PrintVaccination {

}
</style>
