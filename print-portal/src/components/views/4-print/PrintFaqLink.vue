<template>
    <div>
        <router-link
            v-if="to && label"
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
.link {
    display: inline-block;
    padding-top: 8px;
    font-weight: bold;
    text-decoration: none;
}
</style>
