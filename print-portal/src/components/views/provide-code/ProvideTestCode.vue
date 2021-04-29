<script>
export default {
    name: 'ProvideTestCode',
    components: { },
    props: {
        testCodeStatus: {
            type: Object,
            required: true
        },
        isTestCodeValid: {
            type: Boolean,
            required: true
        },
        getSignedResult: {
            type: Function,
            required: true
        },
        verificationNeeded: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        testResultStatus() {
            return this.$store.state.testResultStatus;
        },
        showButton() {
            return !this.verificationNeeded;
        },
        hasGivenConsent() {
            return this.$store.state.userConsent;
        },
        testCode: {
            get() {
                return this.$store.state.testCode;
            },
            set(value) {
                // editing the test code should reset the process
                this.resetProcess();
                const strippedValue = value.replace(/ /g, '');
                const toUpperCase = strippedValue.toUpperCase();
                this.$store.commit('updateProperty', { key: 'testCode', value: toUpperCase })
            }
        }
    },
    methods: {
        resetProcess() {
            this.$store.commit('reset');
        },
        sendTestCode() {
            if (this.isTestCodeValid && this.hasGivenConsent) {
                this.getSignedResult({ includeVerificationCode: false });
            }
        }
    }
}
</script>

<template>
    <div class="ProvideTestCode">
        <div class="input__set">
            <label for="input--testCode">
                {{translate('uniqueCode')}}
            </label>
            <input
                v-model="testCode"
                v-on:keyup.enter="sendTestCode"
                id="input--testCode"
                type="text"
                :placeholder="translate('forInstanceAbbr') + ' BRB-YYYYYYYYY1-Z2'"/>
            <div
                v-if="testCodeStatus.error.length > 0"
                class="input__error">
                {{testCodeStatus.error}}
            </div>
        </div>
        <button
            v-if="showButton"
            @click="sendTestCode()"
            type="button"
            :disabled="(!isTestCodeValid || !hasGivenConsent)"
            :class="{'button--inactive': (!isTestCodeValid || !hasGivenConsent)}"
            class="button-standard">
            {{translate('next')}}
        </button>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.ProvideTestCode {

    .UserConsent {
        margin-bottom: $length-s;
    }
}
</style>
