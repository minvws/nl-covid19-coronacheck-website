<script>
import Vaccination from '@/components/views/3-collect/vaccination/happy/Vaccination';
import Recovery from '@/components/views/3-collect/recovery/happy/Recovery';
import PositiveTest from '@/components/views/3-collect/recovery/happy/PositiveTest';
import uniqWith from 'lodash.uniqwith'
import isEqual from 'lodash.isequal'
import { FilterTypes } from '@/types/filter-types';

export default {
    name: 'ProofEvents',
    components: { Vaccination, Recovery, PositiveTest },
    computed: {
        events () {
            const events = this.$store.getters['signedEvents/getProofEvents']('all')
            const unique = uniqWith(events, isEqual)

            const result = unique.map(item => {
                const { event } = item
                const { type } = event
                const data = event[type]
                const { date, sampleDate } = data

                return {
                    item,
                    type,
                    date: date ?? sampleDate
                }
            })
                .sort(({ date: first }, { date: second }) => second.localeCompare(first)) // sort on date
                .map(({ item, type }) => {
                    switch (type) {
                    case FilterTypes.VACCINATION:
                        return {
                            component: Vaccination,
                            signedEventSet: [item]
                        }
                    case FilterTypes.POSITIVE_TEST:
                        return {
                            component: PositiveTest,
                            signedEvent: item
                        }
                    case FilterTypes.RECOVERY:
                        return {
                            component: Recovery,
                            signedEvent: item
                        }
                    default:
                        return undefined;
                    }
                })
            return result.filter(item => !!item)
        }
    }
}
</script>

<template>
    <div class="proof-events">
        <component
            :is="component"
            :key="index"
            v-for="({ component, ...data }, index) in events"
            v-bind="data"
        />
    </div>
</template>
