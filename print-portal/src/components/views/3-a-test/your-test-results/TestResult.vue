<script>
import TestResult from '@/classes/TestResult';
import dateTool from '@/tools/date';

export default {
    name: 'TestResult',
    components: {},
    props: {
        testResult: {
            type: TestResult,
            required: true
        }
    },
    computed: {
        date() {
            return dateTool.dateTimeToString(this.testResult.sampleDate, 'EEEE d LLLL HH:mm', this.currentLanguage.locale);
        }
    },
    methods: {}
}
</script>

<template>
    <div class="proof-event">
        <div class="proof-event__status">
            {{$t('components.testResult.resultNegative')}}
        </div>
        <div class="proof-event__date">
            {{$t('components.testResult.dateOfTest')}}: {{date}}
        </div>
        <div class="proof-event__date">
            {{$t('components.testResult.yourCredentials')}}: {{testResult.holder.string}}
        </div>
    </div>
</template>
