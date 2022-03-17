<script>
import Print from './Print';
import { events as StorageEvent } from '@/store/modules/storage'
import { FilterTypes } from '@/types/filter-types'
export default {
    name: 'PrintRecovery',
    components: { Print },
    computed: {
        type () {
            return this.$store.getters[StorageEvent.WITH_POSITIVE_TEST] ? FilterTypes.VACCINATION : FilterTypes.RECOVERY;
        },
        recoveryValidInFuture() {
            const today = new Date().getTime();
            const proof = this.$store.state.qrs.proof;

            const isAfterToday = (dateConstructorArg) => {
                const dateValidFrom = new Date(dateConstructorArg).getTime();
                return dateValidFrom > today;
            }

            if (proof.domestic) {
                const validFromInt = Number(proof.domestic.attributes.validFrom) * 1000;
                return isAfterToday(validFromInt)
            } else {
                // See if validFrom in any certificate is after today
                return proof.european.some(({ dcc }) => {
                    // Skip if not a recovery certificate
                    if (!dcc.r || dcc.r.length === 0) {
                        return false
                    }

                    const validFromString = dcc.r[0].df
                    return isAfterToday(validFromString)
                })
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
            :type="type"
            :valid-in-future="recoveryValidInFuture">
        </Print>
    </div>
</template>
