<script>
import Loading from './Loading';

export default {
    name: 'LoadingCover',
    components: { Loading },
    props: {
        text: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            idleTime: 500,
            active: false
        }
    },
    computed: {},
    methods: {},
    mounted() {
        // prevent showing the loading-cover immediately
        setTimeout(() => {
            this.active = true;
        }, this.idleTime)
    }
}
</script>

<template>
    <div
        :class="{'loading-cover--active': active }"
        class="cover loading-cover">
        <loading/>
    </div>
</template>

<style lang="scss">
    .loading-cover {
        align-items: center;
        justify-content: center;
        display: none;

        &--active {
            display: flex;
        }
    }
</style>
