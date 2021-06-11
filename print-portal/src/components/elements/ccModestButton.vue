<script>
export default {
    name: 'ccModestButton',
    props: {
        label: {
            type: String,
            required: true
        },
        marginTop: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        select() {
            this.$emit('select')
        }
    }
}
</script>

<template>
    <button
        @click="select"
        :class="{ 'ccModestButton--margin-top': marginTop }"
        class="ccModestButton">
        {{label}}
    </button>
</template>

<style lang="scss" scoped>
@import "@/styles/variables/index";

.ccModestButton {
    color: $color-coronacheck_blue;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;

    &--margin-top {
        margin-top: $length-s;
    }

    &:hover {

        @media (hover: hover) and (pointer: fine) {
            text-decoration: underline;
        }
    }
}
</style>
