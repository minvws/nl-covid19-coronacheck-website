<script>
import CcButton from '@/components/elements/CcButton';
import ErrorLabel from '@/components/elements/ErrorLabel';

export default {
    name: 'ProvideTestCode',
    components: { ErrorLabel, CcButton },
    props: {
        testCodeStatus: {
            type: Object,
            required: true
        },
        clearTestCode: {
            type: Boolean,
            required: true,
            default: false
        },
        verificationNeeded: {
            type: Boolean,
            required: true
        },
        translation: {
            type: String,
            required: false,
            default: 'views.provideCode'
        }
    },
    data() {
        return {
            exampleCode: 'BRB-YYYYYYYYY1-Z2'
        }
    },
    created () {
        if (!this.clearTestCode) return
        this.testCode = ''
    },
    computed: {
        hasGivenConsent() {
            return this.$store.state.userConsent || process.env.NODE_ENV === 'development';
        },
        testCode: {
            get() {
                return this.$store.state.testCode;
            },
            set(value) {
                // editing the test code should reset the process
                this.$store.commit('resetProvideCode');
                const strippedValue = value.replace(/ /g, '');
                const strippedValue2 = strippedValue.replace(/\t/g, '');
                const toUpperCase = strippedValue2.toUpperCase();
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
            <label for="input-test-code">
                {{$t(`${translation}.uniqueCode`)}}
                <div class="label--side-note">
                    {{$t('forInstanceAbbr')}} {{exampleCode}}
                </div>
            </label>
            <input
                v-model="testCode"
                v-on:keyup.enter="submit"
                id="input-test-code"
                type="text"
                :placeholder="$t(`${translation}.uniqueCode`)"/>
            <ErrorLabel
                v-if="testCodeStatus.error.length > 0"
                :label="testCodeStatus.error"/>
        </div>
        <slot />
        <CcButton
            v-if="!verificationNeeded"
            id="submit-test-code"
            @select="submit()"
            :label="$t('next')"/>
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
