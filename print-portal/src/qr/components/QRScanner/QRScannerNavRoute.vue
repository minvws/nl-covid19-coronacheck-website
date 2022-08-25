<template>
    <component
        class="nav-button"
        :is="link ? 'button' : 'router-link'"
        tag="button"
        @click="onButtonClick"
        v-bind="
            name && {
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
    },
    methods: {
        onButtonClick () {
            if (!this.link) return
            const { href, target } = this.link
            window.open(href, target)
        }
    }
});
</script>

<style lang="scss" scoped>
.nav-button {
    display: block;
    width: 100%;
    text-align: left;
}
</style>
