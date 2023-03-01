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
        },
        warning: {
            type: Object,
            required: false
        }
    },
    computed: {
        group () {
            return this.list.reduce((cul, provider) => {
                const name = this.getGroupName(provider)
                if (!cul[name]) cul[name] = []
                cul[name].push(provider)
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
        },
        groupByType () {
            const list = Object.entries(this.group).reduce((cul, [key, items]) => {
                if (!cul[key]) cul[key] = {}
                items.forEach(item => {
                    const { type } = item
                    if (!cul[key][type]) cul[key][type] = []
                    cul[key][type].push(item)
                    cul[key][type] = cul[key][type]
                        .sort(({ date: a }, { date: b }) => a.localeCompare(b))
                })
                return cul
            }, {});

            if (this.warning) {
                // add a warning in the list at type of auth AND filter -type of warning
                const target = list[this.$t(`provider.${this.$store.getters.authType}`)]
                const { type, message } = this.warning
                if (!target[type]) target[type] = []
                target[type].push({ message })
            }
            return list
        }
    },
    methods: {
        getGroupName (provider) {
            const name = this.getName(provider);
            if (this.$store.getters.groupProofsSummaryByProviderName || name === ProviderTypes.DCC) return name;
            return this.$t(`provider.${this.$store.getters.authType}`)
        },
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
    <div class="summary-list-group" v-for="(items, key) in groupByType" :key="key">
        <h2 class="summary-list-group-title">{{ getTitle(key) }}</h2>
        <div  v-for="(item, type) in items" :key="`${key}-${type}-type`">
            <div class="summary-list-group-type">
                {{ $tc(`components.eventInfo.${type}Result`, item.length) }}
            </div>
            <ul class="summary-list-group-items">
                <li v-for="({ dateString, message }, index) in item" :key="index">
                    {{ dateString || message }}
                </li>
            </ul>
        </div>
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
            font-size: 1.7em;
        }

        &-type {
            font-weight: bold;
            padding-top: 1em;
        }

        &-items {
            list-style-type: none;

        }
   }
}
</style>
