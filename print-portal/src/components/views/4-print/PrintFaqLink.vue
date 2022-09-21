<template>
    <div>
        <router-link
            v-if="to && label"
            tag="button"
            class="link"
            :replace="replace"
            :to="to" >
            {{ label }}
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'PrintFaqLink',
    props: {
        label: {
            type: String,
            required: false
        },
        to: {
            type: Object,
            required: true
        },
        replace: {
            type: Boolean,
            required: false,
            default: false
        }
    }
};
</script>
<style scoped lang="scss">
@import "@/styles/variables/index";

.link {
    display: inline-block;
    padding-top: 8px;
    font-size: 16px;
    font-weight: 700;
    color: $color-coronacheck-link;
    text-decoration: none;

    &:hover {
        @media (hover: hover) and (pointer: fine) {
            text-decoration: underline;
        }
    }
}
</style>
