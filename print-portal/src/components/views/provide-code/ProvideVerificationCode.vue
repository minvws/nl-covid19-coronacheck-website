<script>
export default {
    name: 'ProvideVerificationCode',
    components: { },
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
                this.$store.commit('updateProperty', { key: 'verificationCode', value: strippedValue })
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
                messageHead: this.translate('noVerificationCodeHead'),
                messageBody: this.translate('noVerificationCodeMessage'),
                confirm: true,
                confirmAction,
                confirmYes: this.translate('sendCode'),
                confirmNo: this.translate('close'),
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
                {{translate('verificationCode')}}<br>
                <div class="label--side-note">
                    {{translate('verificationCodeDirection')}}
                </div>
            </label>
            <input
                v-model="verificationCode"
                v-on:keyup.enter="sendVerificationCode"
                id="input--verificationCode"
                type="text"
                pattern="[0-9]*"
                inputmode="numeric"
                :placeholder="translate('forInstanceAbbr') + ' 123456'"/>
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
                        {{translate('sendAgain')}}
                    </span>
                    <span v-else>
                        {{translate('didNotGetCode')}}
                    </span>
                </button>
            </div>
        </div>
        <button
            @click="submit()"
            type="button"
            class="button-standard">
            {{translate('next')}}
        </button>
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
