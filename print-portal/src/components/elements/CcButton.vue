<script>
export default {
    name: 'CcButton',
    components: {},
    props: {
        label: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        fullWidth: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        onClick() {
            this.$emit('select')
        }
    }
}
</script>

<template>
    <button
        type="button"
        @click="onClick"
        :disabled="disabled"
        :class="{
            'button--inactive': disabled,
            'button--full-width': fullWidth
        }"
        class="btn">
        <div class="content">
            {{ label }}
            <slot />
        </div>
    </button>
</template>

<style lang="scss" scoped>
    button {
        &.button--full-width {
            width: 100%;
        }
    }
</style>
