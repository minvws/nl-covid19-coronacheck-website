<script>
export default {
    name: 'ProvideVerificationCode',
    components: { },
    props: {
        verificationCodeStatus: {
            type: Object,
            required: true
        },
        getSignedResult: {
            type: Function,
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
        },
        isVerificationCodeValid() {
            const pattern = /^\d+$/;
            return this.verificationCode.length === 6 && pattern.test(this.verificationCode);
        },
        testResultStatus() {
            return this.$store.state.testResultStatus;
        }
    },
    methods: {
        sendVerificationCode() {
            if (this.isVerificationCodeValid) {
                this.getSignedResult(true);
            }
        },
        requestNewVerificationCode() {
            const message = this.translate('noVerificationCodeMessage')

            const confirmAction = () => {
                // false means: do request without the verification code
                // this will trigger backend to send sms again
                this.getSignedResult(false);
            }

            this.$store.commit('modal/set', {
                message,
                confirm: true,
                confirmAction,
                confirmYes: this.translate('sendAgain'),
                confirmNo: this.translate('back'),
                closeButton: false
            })
        },
        async getTestResults() {
            return new Promise((resolve, reject) => {
                // just resolve for now
                setTimeout(() => {
                    const set = [
                        {
                            id: 1,
                            status: 'negative',
                            date: '2021-03-06 11:00',
                            properties: ' G W 01 FEB'
                        }
                    ];
                    resolve(set);
                }, 500)
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
                    {{translate('didNotGetCode')}}
                </button>
            </div>
        </div>
        <button
            @click="sendVerificationCode()"
            type="button"
            :class="{'button--inactive': !isVerificationCodeValid}"
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
