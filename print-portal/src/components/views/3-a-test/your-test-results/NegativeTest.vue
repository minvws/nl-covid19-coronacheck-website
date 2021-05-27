<script>
import NegativeTest from '@/classes/events/NegativeTest';
import Holder from '@/classes/holder/Holder';
import dateTool from '@/tools/date';

export default {
    name: 'NegativeTest',
    components: {},
    props: {
        negativeTest: {
            type: NegativeTest,
            required: true
        },
        holder: {
            type: Holder,
            required: true
        }
    },
    computed: {
        date() {
            return dateTool.dateTimeToString(this.negativeTest.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        }
    },
    methods: {}
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status">
            {{$t('components.NegativeTest.resultNegative')}}
        </div>
        <div class="proof-event__date">
            {{$t('components.NegativeTest.dateOfTest')}}: {{date}}
        </div>
        <div class="proof-event__date">
            {{$t('components.NegativeTest.yourCredentials')}}: {{holder.discreteInfoString}}
        </div>
    </div>
</template>
