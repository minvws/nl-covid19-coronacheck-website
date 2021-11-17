<script>
import { FilterTypes } from '@/types/filter-types'
import { RegionTypes } from '@/types/region-types'

export default {
    name: 'PrintFaq',
    props: {
        type: {
            type: String,
            required: true
        },
        regionType: {
            type: String,
            required: true
        }
    },
    computed: {
        title () {
            return this.$t('views.print.details.header')
        },
        details() {
            const details = [];
            if (this.type === FilterTypes.VACCINATION && this.regionType === RegionTypes.EUROPEAN) {
                details.push('whyNoDomesticVaccination');
            }
            if (this.type === FilterTypes.RECOVERY && this.regionType === RegionTypes.DOMESTIC) {
                details.push('whyNoEuropeanRecovery');
            }
            if (this.type === FilterTypes.NEGATIVE_TEST && this.regionType === RegionTypes.EUROPEAN) {
                details.push('whyNoDomesticTest');
            }
            if (this.type === FilterTypes.NEGATIVE_TEST && this.regionType === RegionTypes.DOMESTIC) {
                details.push('whyNoEuropeanTest');
            }
            if (this.regionType === RegionTypes.EUROPEAN || this.regionType === RegionTypes.BOTH) {
                details.push('validLocation');
            }
            if (this.type === FilterTypes.VACCINATION) {
                details.push('validPeriod');
            }
            return details;
        }
    },
    methods: {}
}
</script>

<template>
    <div class="PrintFaq">
         <h2
            v-if="title"
            class="screen-reader-text">
            {{ title }}
        </h2>
        <div class="content-block">
            <details
                v-for="(detail, index) in details"
                :key="index"
                class="details details--modest">
                <summary>
                    <h3>
                    {{$t('views.print.details.set.' + detail + '.summary')}}
                    </h3>
                </summary>
                <div v-html="$t('views.print.details.set.' + detail + '.content')">
                </div>
            </details>
        </div>
    </div>
</template>

<style lang="scss">
.PrintFaq {

        h2 {
            font-size: 18px;
            text-align: center;
        }

}
</style>
