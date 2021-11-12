<script>

export default {
    name: 'Paper',
    props: {
        region: {
            type: String,
            required: true,
            validator: (value) => {
                return ['domestic', 'european'].indexOf(value) > -1;
            }
        }
    },
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="Paper">
        <div class="Paper__flag">
            <img :src="'assets/img/flags/' + region + '.svg'" alt="" />
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Paper {
    position: relative;
    background: #fff;

    &__overheid {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

    &__flag {
        padding-bottom: 20px;
       img {
            border-radius: 3px;
            overflow: hidden;
            width: 64px;
            height: auto;
        }
    }

    h4 {
        font-size: calc(13.5rem / 16);
        margin: 0;
        text-align: center;
    }

    @include mobile() {
        width: 100%;
        height: auto;

        &__overheid,
        h4 {
            display: none;
        }

        &__flag {

            img {
                width: 56px;
            }
        }
    }
}
</style>
