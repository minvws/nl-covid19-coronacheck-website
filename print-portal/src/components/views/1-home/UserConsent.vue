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
        },
        consent() {
            this.value = this.consent;
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
    background: $color-lightgrey;
    border-radius: 12px;
    display: flex;
    align-items: center;
    margin: 0 0 $length-s 0;

    input[type=checkbox] {
        width: 28px;
        height: 28px;
        margin-right: 20px;
        border-radius: 3px;
        border: 1px solid $color-coronacheck_black;
        cursor: pointer;
    }

    label {
        width: calc(100% - 48px);
        cursor: pointer;

        a {
            text-decoration: underline;
        }

        a,
        a:visited {
            color: $color-coronacheck-link;

            &:hover,
            &:focus {
                color: $color-cc-link-darker--interaction;
            }
        }
    }
}
</style>
