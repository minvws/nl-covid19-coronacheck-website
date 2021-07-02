<script>
import Print from './Print';
import PageIntro from '@/components/elements/PageIntro';
import printMixin from './print-mixin';

export default {
    name: 'PrintRecovery',
    components: { Print, PageIntro },
    mixins: [printMixin],
    computed: {
        proof() {
            return this.$store.state.qrs.proof;
        },
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
        bodyText() {
            if (this.recoveryValidInFuture) {
                return this.$t('views.printRecovery.validInFuture.pageIntro');
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
                :head="$t('views.printRecovery.' + pageType + '.pageHeader')"
                :intro="bodyText"/>
        </Print>
    </div>
</template>
