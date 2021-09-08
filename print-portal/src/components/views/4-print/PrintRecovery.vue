<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';
import printMixin from './print-mixin';

export default {
    name: 'PrintRecovery',
    components: { Print, PageIntro },
    mixins: [printMixin],
    computed: {
        recoveryValidInFuture() {
            let dateValidFromString;
            const today = new Date().getTime();
            if (this.proof.domestic) {
                dateValidFromString = Number(this.proof.domestic.attributes.validFrom) * 1000;
            } else {
                dateValidFromString = this.proof.european.dcc.r[0].fr;
            }
            const dateValidFrom = new Date(dateValidFromString).getTime();
            return dateValidFrom > today;
        },
        // for recovery there are more combination possible, beacuse of 2 variables:
        // domestic/european/boths vs recoveryValidInFuture:true/false
        headText() {
            if (this.recoveryValidInFuture) {
                return this.$t('views.printRecovery.' + this.pageType + 'validInFuture.pageHeader');
            } else {
                return this.$t('views.printRecovery.' + this.pageType + '.pageHeader');
            }
        },
        bodyText() {
            if (this.recoveryValidInFuture) {
                return this.$t('views.printRecovery.' + this.pageType + 'validInFuture.pageIntro');
            } else {
                return this.$t('views.printRecovery.' + this.pageType + '.pageIntro');
            }
        }
    },
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
                :head="headText"
                :intro="bodyText"/>
        </Print>
    </div>
</template>
