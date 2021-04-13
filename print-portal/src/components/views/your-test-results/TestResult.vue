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
        status() {
            if (this.testResult.negativeResult) {
                return 'Negatief testresultaat (geen corona)';
            } else {
                return 'Positief testresultaat (wel corona)';
            }
        },
        date() {
            return dateTool.dateToString(this.testResult.sampleDate, 'EEEE d LLLL hh:mm', this.currentLanguage.locale);
        }
    },
    methods: {}
}
</script>

<template>
    <div class="TestResult">
        <div class="TestResult__status">
            {{status}}
        </div>
        <div class="TestResult__date">
            {{date}}
        </div>
        <div class="TestResult__date">
            Jouw gegevens: {{testResult.holder.string}}
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.TestResult {
    padding: 8px 0;
    border-bottom: 1px solid $grey-2;
    font-size: 17px;
    margin-bottom: 12px;

    &:first-child {
        border-top: 1px solid $grey-2;
    }

    .TestResult__status {
        font-weight: 700;
    }

    > div {
        margin-bottom: 4px;
    }
}
</style>
