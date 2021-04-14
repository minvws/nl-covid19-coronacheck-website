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
                return this.translate('resultNegative');
            } else {
                return this.translate('resultPositive');
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
            {{translate('yourCredentials')}}: {{testResult.holder.string}}
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.TestResult {
    padding: $grid-x2 0;
    border-bottom: 1px solid $grey-4;
    font-size: 17px;
    margin-bottom: $grid-x2;

    &:first-child {
        border-top: 1px solid $grey-4;
    }

    .TestResult__status {
        font-weight: 700;
    }

    > div {
        margin-bottom: 4px;
    }
}
</style>
