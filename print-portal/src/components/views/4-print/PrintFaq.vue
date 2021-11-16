<script>
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
            if (this.type === 'vaccination' && this.regionType === 'european') {
                details.push('whyNoDomesticVaccination');
            }
            if (this.type === 'recovery' && this.regionType === 'domestic') {
                details.push('whyNoEuropeanRecovery');
            }
            if (this.type === 'negativetest' && this.regionType === 'european') {
                details.push('whyNoDomesticTest');
            }
            if (this.type === 'negativetest' && this.regionType === 'domestic') {
                details.push('whyNoEuropeanTest');
            }
            if (this.regionType === 'european' || this.regionType === 'both') {
                details.push('validLocation');
            }
            if (this.type === 'vaccination') {
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
            class="visually-hidden">
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

        .visually-hidden {
            clip-path: inset(100%);
            clip: rect(1px, 1px, 1px, 1px);
            height: 1px;
            overflow: hidden;
            position: absolute;
            white-space: nowrap;
            width: 1px;
        }
}
</style>
