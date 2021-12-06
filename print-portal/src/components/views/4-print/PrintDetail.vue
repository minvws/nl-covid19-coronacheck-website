<template>
    <details>
        <summary>
            <h3>
                {{ summary }}
            </h3>
        </summary>
        <div v-html="content" :class="{ slot: hasSlot }"/>
        <slot />
    </details>
</template>
<script>
export default {
    props: {
        summary: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    computed: {
        hasSlot () {
            return !!this.$slots.default?.[0];
        }
    }
};
</script>
<style scoped>
.slot {
    padding-bottom: 0;
}
</style>
