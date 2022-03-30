<script>
import dateTool from '@/tools/date';
import proofEventMixin from '@/components/views/3-collect/_shared/proof-event-mixin'
import vaccinationOverviewMixin from '@/components/views/3-collect/_shared/vaccination-overview-mixin'

export default {
    name: 'VaccinationSummary',
    mixins: [proofEventMixin, vaccinationOverviewMixin],
    props: {
        signedEventSet: {
            type: Array,
            required: true
        }
    },
    computed: {
        group () {
            return this.vaccinations.reduce((cul, cur) => {
                if (!cul[cur.name]) cul[cur.name] = []
                cul[cur.name].push(cur)
                return cul
            }, {})
        },
        vaccinations () {
            const list = this.signedEventSet.flat().map(({ providerIdentifier, event }) => {
                const type = 'vaccination'
                const { hpkCode, date } = event[type]
                const provider = this.$store.getters['eventProviders/getTestProviderByIdentifier'](providerIdentifier);
                const dateString = this.formateDate(date)
                return { hpkCode, type, name: provider?.name, date, dateString }
            })

            return list.filter((a, index) => {
                const position = list.findIndex(({ hpkCode, date, type }) => {
                    return hpkCode === a.hpkCode && date === a.date && type === a.type
                })
                return position !== index
            })
        }
    },
    methods: {
        formateDate(date) {
            return dateTool.dateToString(date, 'date-without-day', this.currentLanguage.locale);
        }
    }
}
</script>

<template>
<div class="summary-list">
    <div v-for="(item, key) in group" :key="key">
        <b>{{ $t('components.eventInfo.receivedFrom') }} {{ key }}</b>
        <div v-for="({ dateString, type }, index) in item" :key="index">
            {{ $t(`components.eventInfo.${type}Result`) }} {{ dateString}}
        </div>
    </div>
</div>
</template>

<style lang="scss">
.summary-list {
   padding-bottom: 2em;
}
</style>
