<script>
export default {
    name: 'PageChoice',
    components: {},
    props: {
        header: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    methods: {
        select() {
            this.$emit('select')
        }
    }
}
</script>

<template>
    <div
        @click="select"
        class="PageChoice">
        <div class="PageChoice__header">
            {{header}}
        </div>
        <div class="PageChoice__body">
            {{body}}
        </div>
    </div>
</template>

<style lang="scss">
    @import "@/styles/variables/index";

    .PageChoice {
        background: $color-lightgrey;
        margin-bottom: 24px;
        padding: $grid-x2;
        border-radius: 9px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        cursor: pointer;

        &:hover {
            background: $color-mediumgrey;
        }

        &:last-child {
            margin-bottom: 0;
        }

        &__header {
            font-weight: 700;
            margin-bottom: $grid-x1;
        }
    }
</style>
