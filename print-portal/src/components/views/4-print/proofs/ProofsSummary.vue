<script>
import dateTool from '@/tools/date';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import vaccinationOverviewMixin from '@/components/views/3-collect/_shared/vaccination-overview-mixin'
import { ProviderTypes } from '@/types/provider-types';
export default {
    name: 'ProofsSummary',
    mixins: [proofEventMixin, vaccinationOverviewMixin],
    props: {
        events: {
            type: Array,
            required: true
        }
    },
    computed: {
        group () {
            return this.list.reduce((cul, cur) => {
                if (!cul[cur.name]) cul[cur.name] = []
                cul[cur.name].push(cur)
                return cul
            }, {})
        },
        list () {
            const list = this.events.flat().map(({ providerIdentifier, event }) => {
                const provider = this.$store.getters['eventProviders/getTestProviderByIdentifier'](providerIdentifier);
                const name = this.getName(provider)
                return this.getResult({ name, event });
            })
            return list.filter(a => !!a).filter((a, index) => {
                const position = list.findIndex(({ hpkCode, date, type }) => {
                    return hpkCode === a?.hpkCode && date === a.date && type === a.type
                })
                return position === index
            })
        }
    },
    methods: {
        getResult ({ name, event }) {
            const { type } = event
            const { hpkCode, date, sampleDate } = event[type]
            const dateString = this.formateDate(date || sampleDate)
            return { hpkCode, type, name, date, dateString }
        },
        formateDate(date) {
            return dateTool.dateToString(date, 'date-without-day', this.currentLanguage.locale);
        },
        getName (provider) {
            return provider?.name ?? ProviderTypes.DCC
        },
        getTitle (providerName) {
            if (providerName === ProviderTypes.DCC) return this.$t('components.eventInfo.scannedQR')
            return `${this.$t('components.eventInfo.receivedFrom')} ${providerName}`
        }
    }
}
</script>

<template>
<div class="summary-list">
    <div class="summary-list-group" v-for="(item, key) in group" :key="key">
        <h2 class="summary-list-group-title">{{ getTitle(key) }}</h2>
        <ul class="summary-list-group-items">
            <li v-for="({ dateString, type }, index) in item" :key="index">
                {{ $t(`components.eventInfo.${type}Result`) }} {{ dateString}}
            </li>
        </ul>
    </div>
</div>
</template>

<style lang="scss">
 @import "@/styles/variables/typography.scss";

.summary-list {
   &-group {
        padding-bottom: 2em;

        &-title {
            font-family: $font-main;
            padding: 0;
            margin: 0 0 .1em 0;
            font-size: 1em;
        }
        &-items {
            list-style-type: none;

        }
   }
}
</style>
