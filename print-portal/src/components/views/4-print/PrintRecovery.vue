<script>
import Print from './Print';

export default {
    name: 'PrintRecovery',
    components: { Print },
    computed: {
        recoveryValidInFuture() {
            const proof = this.$store.state.qrs.proof;
            let dateValidFromString;
            const today = new Date().getTime();
            if (proof.domestic) {
                dateValidFromString = Number(proof.domestic.attributes.validFrom) * 1000;
            } else {
                const certificate = proof.european.find(({ dcc }) => dcc.r?.[0].df)
                dateValidFromString = certificate.dcc.r[0].df;
            }
            const dateValidFrom = new Date(dateValidFromString).getTime();
            return dateValidFrom > today;
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
            :type="'recovery'"
            :valid-in-future="recoveryValidInFuture">
        </Print>
    </div>
</template>
