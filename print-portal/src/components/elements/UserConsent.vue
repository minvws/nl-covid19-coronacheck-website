<script>
export default {
    name: 'UserConsent',
    components: {},
    computed: {
        userConsent: {
            get() {
                return this.$store.state.userConsent;
            },
            set(value) {
                // only true is possible, after consent is given, the input is being disabled
                if (value) {
                    this.$store.commit('giveUserConsent');
                }
            }
        }
    },
    methods: {}
}
</script>

<template>
    <div class="UserConsent">
        <input
            v-model="userConsent"
            :disabled="userConsent"
            id="user-consent"
            name="user-consent"
            type="checkbox">
        <label
            :disabled="userConsent"
            for="user-consent">
            Ik heb de <a href="https://coronacheck.nl/nl/privacy" target="_blank">privacyverklaring</a> gelezen en
            geef toestemming voor het verwerken van mijn persoonsgegevens.
        </label>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.UserConsent {
    padding: 20px;
    background: $grey-5;
    border-radius: 12px;
    display: flex;
    align-items: center;
    font-size: 17px;

    input[type=checkbox] {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 20px;
        border: 1px solid $grey-3;
        cursor: pointer;

        &[disabled] {
            cursor: default;
        }
    }

    label {
        width: calc(100% - 48px);
        cursor: pointer;

        &[disabled] {
            cursor: default;
        }
    }
}
</style>
