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
        }
    },
    computed: {
        testResultStatus() {
            return this.$store.state.testResultStatus;
        },
        showButton() {
            // only show this button when there is an action to be done concerning the test code
            return this.testResultStatus !== 'verification_required' && this.testResultStatus !== 'complete';
        },
        testCode: {
            get() {
                return this.$store.state.testCode;
            },
            set(value) {
                // editing the test code should reset the process
                this.resetProcess();
                const strippedValue = value.replace(/ /g, '');
                this.$store.commit('updateProperty', { key: 'testCode', value: strippedValue })
            }
        }
    },
    methods: {
        resetProcess() {
            // brings ui back to step 1
            this.$store.commit('setTestResultStatus', 'idle');
            // remove verification code
            this.$store.commit('updateProperty', { key: 'verificationCode', value: '' });
            // remove QR code
            this.$store.commit('clearQrCode');
        },
        sendTestCode() {
            if (this.isTestCodeValid) {
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
                class="input--capitals"
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
            :disabled="!isTestCodeValid"
            :class="{'button--inactive': !isTestCodeValid}"
            class="button-standard">
            {{translate('next')}}
        </button>
    </div>
</template>

<style lang="scss">
.ProvideTestCode {

}
</style>
