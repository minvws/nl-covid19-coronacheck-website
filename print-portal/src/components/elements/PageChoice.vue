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
    <button
        @click="select"
        class="PageChoice">
        <div class="PageChoice__content">
            <div class="PageChoice__header PageChoice__line">
                {{header}}
            </div>
            <div
                v-if="body"
                class="PageChoice__body PageChoice__line">
                {{body}}
            </div>
        </div>
        <div class="PageChoice__icon">
            <img src="assets/img/icons/next.svg"/>
        </div>
    </button>
</template>

<style lang="scss" scoped>
@import "@/styles/variables/index";

.PageChoice {
    background: $color-lightgrey;
    margin-bottom: 24px;
    padding: $grid-x2 60px $grid-x2 $grid-x2;
    border-radius: 9px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    cursor: pointer;
    position: relative;
    border: 2px solid transparent;
    display: block;
    width: 100%;
    text-align: left;
    font-size: inherit;
    outline: none;
    white-space: normal;
    min-height: 80px;

    &:hover {
        background: #fff;
    }

    &:focus {
        border: 2px solid $color-coronacheck-link;
    }

    &:last-child {
        margin-bottom: 0;
    }

    &__header {
        font-weight: 700;
    }

    &__line {
        margin-bottom: $grid-x1;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &__icon {
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);

        img {
            width: 12px;
            display: block;
        }
    }
}
</style>
