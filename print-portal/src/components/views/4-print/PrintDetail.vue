<template>
    <details>
        <summary>
            <h3>
                {{ summary }}
            </h3>
        </summary>
        <div v-html="content" />
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
    }
};
</script>
