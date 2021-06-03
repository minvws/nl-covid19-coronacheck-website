<script>
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'ProvideVerificationCode',
    components: { CcButton },
    props: {
        verificationCodeStatus: {
            type: Object,
            required: true
        }
    },
    computed: {
        verificationCode: {
            get() {
                return this.$store.state.verificationCode;
            },
            set(value) {
                const strippedValue = value.replace(/ /g, '');
                const strippedValue2 = strippedValue.replace(/\t/g, '');
                this.$store.commit('updateProperty', { key: 'verificationCode', value: strippedValue2 })
            }
        }
    },
    methods: {
        submit() {
            this.$emit('submit-verification-code')
        },
        requestNewVerificationCode() {
            const confirmAction = () => {
                // this will trigger backend to send sms again
                this.$emit('submit-test-code')
            }

            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.noVerificationCode.head'),
                messageBody: this.$t('message.info.noVerificationCode.body'),
                confirm: true,
                confirmAction,
                confirmYes: this.$t('views.provideCode.sendCode'),
                confirmNo: this.$t('close'),
                closeButton: false
            })
        }
    }
}
</script>

<template>
    <div class="ProvideVerificationCode">
        <div class="input__set">
            <label for="input--verificationCode">
                {{$t('views.provideCode.verificationCode')}}<br>
                <div class="label--side-note">
                    {{$t('views.provideCode.verificationCodeDirection')}}
                </div>
            </label>
            <input
                v-model="verificationCode"
                v-on:keyup.enter="submit"
                id="input--verificationCode"
                type="text"
                pattern="[0-9]*"
                inputmode="numeric"
                :placeholder="$t('forInstanceAbbr') + ' 123456'"/>
            <div
                v-if="verificationCodeStatus.error.length > 0"
                class="input__error">
                {{verificationCodeStatus.error}}
            </div>
            <div class="request-new-verification-code__container">
                <button
                    @click="requestNewVerificationCode()"
                    type="button"
                    class="button-modest">
                    <span v-if="verificationCodeStatus.error.length > 0">
                        {{$t('views.provideCode.sendAgain')}}
                    </span>
                    <span v-else>
                        {{$t('views.provideCode.didNotGetCode')}}
                    </span>
                </button>
            </div>
        </div>
        <CcButton
            @select="submit()"
            :label="$t('next')"/>
    </div>
</template>

<style lang="scss">
.ProvideVerificationCode {

    .request-new-verification-code__container {
        height: 24px;
        margin-top: 18px;
    }
}
</style>
