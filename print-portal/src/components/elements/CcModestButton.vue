<script>
export default {
    name: 'CcModestButton',
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
        :class="{ 'CcModestButton--margin-top': marginTop }"
        class="CcModestButton">
        {{label}}
    </button>
</template>

<style lang="scss" scoped>
@import "@/styles/variables/index";

.CcModestButton {
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
