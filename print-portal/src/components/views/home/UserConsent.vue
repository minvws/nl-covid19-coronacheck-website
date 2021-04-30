<script>
export default {
    name: 'UserConsent',
    components: {},
    props: {
        consent: {
            type: Boolean,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            value: this.consent
        }
    },
    watch: {
        value() {
            this.$emit('update', this.value);
        }
    }
}
</script>

<template>
    <div class="UserConsent">
        <input
            v-model="value"
            id="user-consent"
            name="user-consent"
            type="checkbox">
        <label
            for="user-consent"
            v-html="label"/>
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
        cursor: pointer;
    }

    label {
        width: calc(100% - 48px);
        cursor: pointer;
    }
}
</style>
