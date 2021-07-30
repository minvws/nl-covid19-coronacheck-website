<script>
export default {
    name: 'InfoButton',
    components: {},
    props: {
        showInfo: {
            type: Boolean,
            required: true
        }
    },
    computed: {},
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
        :aria-expanded="showInfo ? 'true' : 'false'"
        class="InfoButton">
        {{$t('details')}}
    </button>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.InfoButton {
    color: $color-coronacheck-link;
    margin-top: 8px;
    font-weight: 600;
    font-size: inherit;
}
</style>
