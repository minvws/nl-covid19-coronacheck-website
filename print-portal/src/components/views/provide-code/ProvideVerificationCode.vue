<script>
export default {
    name: 'ProvideVerificationCode',
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
    components: {},
    computed: {
        verificationCode: {
            get() {
                return this.$store.state.verificationCode;
            },
            set(value) {
                this.$store.commit('updateProperty', { key: 'verificationCode', value })
            }
        },
        isVerificationCodeValid() {
            // todo refine
            return this.verificationCode.length === 6;
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
            if (this.isVerificationCodeValid) {
                // false means: do request without the verification code
                // this will trigger backend to send sms again
                this.getSignedResult(false);
            }
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
            <div class="input__label">
                <b>Verificatie code</b><br>
                Je krijgt een code in een sms of e-mail
            </div>
            <input
                v-model="verificationCode"
                placeholder="Bijv. 123456"/>
            <div
                v-if="verificationCodeStatus.error.length > 0"
                class="input__error">
                {{verificationCodeStatus.error}}
            </div>
            <div class="request-new-verification-code__container">
                <div
                    v-if="verificationCodeStatus.expired"
                    @click="requestNewVerificationCode()"
                    class="input__small-button">
                    Stuur opnieuw
                </div>
            </div>
        </div>
        <button
            @click="sendVerificationCode()"
            type="button"
            :class="{'button--inactive': !isVerificationCodeValid}">
            Volgende
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
