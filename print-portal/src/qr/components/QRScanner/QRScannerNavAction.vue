<template>
    <button
        class="action"
        @click="action"
    >
        <slot />
    </button>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
    props: {
        action: {
            type: Function,
            required: true
        }
    }
});
</script>

<style lang="scss" scoped>
.action {
    width: 100%;
    text-align: left;
}
</style>
