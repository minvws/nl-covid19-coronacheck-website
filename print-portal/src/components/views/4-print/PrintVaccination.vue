<script>
import Print from './Print';
import { FilterTypes } from '@/types/filter-types'

export default {
    name: 'PrintVaccination',
    components: { Print },
    computed: {
        filterType: () => {
            return FilterTypes.VACCINATION
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>

<template>
    <div class="PrintVaccination">
        <Print
            @back="back"
            :type="filterType">
        </Print>
    </div>
</template>
