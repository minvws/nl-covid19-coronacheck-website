<script>
export default {
    name: 'ErrorLabel',
    props: {
        label: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <p class="error-label" role="alert">
        {{label}}
    </p>
</template>

<style lang="scss" scoped>
@import "@/styles/variables/index";

.error-label {
    margin-top: 12px;
    color: $color-error;
    font-size: 13px;
    padding-left: 24px;
    position: relative;

    &:after {
        content: '!';
        position: absolute;
        left: 0;
        top: 0;
        width: 14px;
        height: 14px;
        font-size: 11px;
        line-height: 1;
        font-weight: 700;
        border-radius: 50%;
        padding-bottom: 1px;
        border: 1px solid $color-error;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
