<script>
import UserConsent from '@/components/elements/UserConsent';

export default {
    name: 'ProvideTestCode',
    components: { UserConsent },
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
                this.$store.commit('updateProperty', { key: 'testCode', value: strippedValue })
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
        <UserConsent/>
        <button
            v-if="!verificationNeeded"
            @click="submit()"
            type="button"
            :disabled="!hasGivenConsent"
            :class="{'button--inactive': !hasGivenConsent}"
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
