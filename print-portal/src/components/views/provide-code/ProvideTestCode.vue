<script>
export default {
    name: 'ProvideTestCode',
    components: { },
    props: {
        testCodeStatus: {
            type: Object,
            required: true
        },
        verificationNeeded: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        hasGivenConsent() {
            return this.$store.state.userConsent;
        },
        testCode: {
            get() {
                return this.$store.state.testCode;
            },
            set(value) {
                // editing the test code should reset the process
                this.$store.commit('reset');
                const strippedValue = value.replace(/ /g, '');
                const toUpperCase = strippedValue.toUpperCase();
                this.$store.commit('updateProperty', { key: 'testCode', value: toUpperCase })
            }
        }
    },
    methods: {
        submit() {
            if (this.hasGivenConsent) {
                this.$emit('submit')
            }
        }
    }
}
</script>

<template>
    <div class="ProvideTestCode">
        <div class="input__set">
            <label for="input--testCode">
                {{$t('uniqueCode')}}
            </label>
            <input
                v-model="testCode"
                v-on:keyup.enter="sendTestCode"
                id="input--testCode"
                type="text"
                :placeholder="$t('forInstanceAbbr') + ' BRB-YYYYYYYYY1-Z2'"/>
            <div
                v-if="testCodeStatus.error.length > 0"
                class="input__error">
                {{testCodeStatus.error}}
            </div>
        </div>
        <button
            v-if="!verificationNeeded"
            @click="submit()"
            type="button"
            :disabled="(!isTestCodeValid || !hasGivenConsent)"
            :class="{'button--inactive': (!isTestCodeValid || !hasGivenConsent)}"
            class="btn">
            {{$t('next')}}
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
