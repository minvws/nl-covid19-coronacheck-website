<script>
export default {
    name: 'ProvideTestCode',
    components: {},
    props: {
        testCodeStatus: {
            type: Object,
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
                this.$store.commit('updateProperty', { key: 'testCode', value })
            }
        },
        isTestCodeValid() {
            // todo refine
            return this.testCode.length > 3;
        }
    },
    methods: {
        sendTestCode() {
            if (this.isTestCodeValid) {
                this.getSignedResult(false);
            }
        }
    }
}
</script>

<template>
    <div class="ProvideTestCode">
        <div class="input__set">
            <div class="input__label">
                <b>Unieke code</b>
            </div>
            <input
                v-model="testCode"
                class="input--capitals"
                placeholder="Bijv. BRB-YYYYYYYYY1-Z2"/>
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
            :class="{'button--inactive': !isTestCodeValid}">
            Volgende
        </button>
    </div>
</template>

<style lang="scss">
.ProvideTestCode {

}
</style>
