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
                this.$store.commit('setUserConsent', value);
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
            id="user-consent"
            name="user-consent"
            type="checkbox">
        <label for="user-consent">
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

    input[type=checkbox] {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        margin-right: 20px;
        border: 1px solid $grey-3;
    }

    label {
        width: calc(100% - 48px);
    }
}
</style>
