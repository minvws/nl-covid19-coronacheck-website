<template>
    <component
        :is="link ? 'a' : 'router-link'"
        v-bind="
            link || {
                to: { name, params },
                replace,
            }
        "
    >
        <slot />
    </component>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
    props: {
        link: {
            type: Object,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        params: {
            type: Object,
            required: false
        },
        replace: {
            type: Boolean,
            required: false
        }
    }
});
</script>
