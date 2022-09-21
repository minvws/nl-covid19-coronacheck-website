<script>
import PrintDetail from './PrintDetail.vue'
import PrintFaqLink from './PrintFaqLink.vue'
import { FilterTypes } from '@/types/filter-types'
import { RegionTypes } from '@/types/region-types'

export default {
    name: 'PrintFaq',
    components: {
        PrintDetail,
        PrintFaqLink
    },
    props: {
        type: {
            type: String,
            required: true
        },
        regionType: {
            type: String,
            required: true
        },
        exclude: {
            type: String,
            required: false
        }
    },
    computed: {
        title () {
            return this.$t('views.print.details.header')
        },
        details() {
            if (this.exclude === RegionTypes.SHORT_STAY) {
                return ['shortStay']
            }
            const details = []

            if (this.type === FilterTypes.VACCINATION) {
                if (!this.$store.getters.is1G) details.push('whyNoDutchCertificate');
                if (this.regionType === RegionTypes.EUROPEAN) {
                    if (this.$store.getters.is1G) {
                        details.push('whyNoDomesticVaccination1G');
                        details.push('whyNoDutchCertificate');
                    } else details.push('whyNoDomesticVaccination');
                }
            }
            if (this.type === FilterTypes.RECOVERY && this.regionType === RegionTypes.EUROPEAN) {
                if (this.$store.getters.is1G) details.push('whyNoDomesticRecovery1G');
            }
            if (this.type === FilterTypes.RECOVERY && this.regionType === RegionTypes.DOMESTIC) {
                details.push('whyNoEuropeanRecovery');
            }

            if (this.type === FilterTypes.NEGATIVE_TEST && this.regionType === RegionTypes.EUROPEAN) {
                if (this.$store.getters.is1G) details.push('whyNoDomesticTest1G');
                else details.push('whyNoDomesticTest');
            }
            if (this.type === FilterTypes.NEGATIVE_TEST && this.regionType === RegionTypes.BOTH) {
                if (this.$store.getters.is1G) details.push('whyNoDomesticTest1G');
            }
            if (this.type === FilterTypes.NEGATIVE_TEST && this.regionType === RegionTypes.DOMESTIC) {
                details.push('whyNoEuropeanTest');
            }
            if (this.regionType === RegionTypes.EUROPEAN || this.regionType === RegionTypes.BOTH) {
                details.push('validLocation');
            }
            return details;
        },
        action () {
            const name = 'whyNoDutchCertificate'
            const summary = this.translate(name, 'summary')
            const content = this.translate(name, 'content')
            const label = this.translate(name, 'label')
            return {
                summary,
                content,
                label,
                to: {
                    name: 'CollectPositiveTest'
                }
            }
        },
        content () {
            return this.details.map(name => {
                const summary = this.translate(name, 'summary')
                const content = this.translate(name, 'content')
                return {
                    name,
                    summary,
                    content
                }
            })
                // filter out empty translations
                .filter((
                    {
                        summary,
                        content
                    }
                ) => (summary !== null && content !== null))
        }
    },
    methods: {
        translate (name, prop) {
            const id = 'views.print.details.set.'
            const key = `${id}${name}.${prop}`
            const translation = this.$t(key)
            return translation !== key ? translation : null;
        }
    }
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
            <PrintDetail
                v-for="({ name, content, summary }) in content"
                :key="name"
                v-bind="{content, summary}"
                class="details details--modest">
                <PrintFaqLink
                    v-if="name === 'whyNoDutchCertificate'"
                    v-bind="action"
                />
            </PrintDetail>
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
