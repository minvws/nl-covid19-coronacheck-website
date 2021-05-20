<script>
export default {
    name: 'Loading',
    components: {},
    props: {
        text: {
            type: String,
            required: false
        }
    },
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="Loading">
        <div class="lds-default">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            <div
                v-if="text"
                class="Loading__text">
                {{text}}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "@/styles/variables/index";
    $size: 0.5;

    .Loading {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: $length-xl;

        .lds-default {
            display: inline-block;
            position: relative;
            width: 40px * $size;
            height: 40px * $size;

            .Loading__text {
                position: absolute;
                left: 100%;
                top: 40px * $size;
                transform: translateY(-50%);
                margin-top: -2px;
                padding-left: 30px;
                white-space: nowrap;
                font-size: 12px;
            }

            div:not(.Loading__text) {
                position: absolute;
                width: 6px * $size;
                height: 6px * $size;
                background: #000;
                border-radius: 50%;
                animation: lds-default 1.2s linear infinite;

                &:nth-child(1) {
                    animation-delay: 0s;
                    top: 37px * $size;
                    left: 66px * $size;
                }
                &:nth-child(2) {
                    animation-delay: -0.1s;
                    top: 22px * $size;
                    left: 62px * $size;
                }
                &:nth-child(3) {
                    animation-delay: -0.2s;
                    top: 11px * $size;
                    left: 52px * $size;
                }
                &:nth-child(4) {
                    animation-delay: -0.3s;
                    top: 7px * $size;
                    left: 37px * $size;
                }
                &:nth-child(5) {
                    animation-delay: -0.4s;
                    top: 11px * $size;
                    left: 22px * $size;
                }
                &:nth-child(6) {
                    animation-delay: -0.5s;
                    top: 22px * $size;
                    left: 11px * $size;
                }
                &:nth-child(7) {
                    animation-delay: -0.6s;
                    top: 37px * $size;
                    left: 7px * $size;
                }
                &:nth-child(8) {
                    animation-delay: -0.7s;
                    top: 52px * $size;
                    left: 11px * $size;
                }
                &:nth-child(9) {
                    animation-delay: -0.8s;
                    top: 62px * $size;
                    left: 22px * $size;
                }
                &:nth-child(10) {
                    animation-delay: -0.9s;
                    top: 66px * $size;
                    left: 37px * $size;
                }
                &:nth-child(11) {
                    animation-delay: -1s;
                    top: 62px * $size;
                    left: 52px * $size;
                }
                &:nth-child(12) {
                    animation-delay: -1.1s;
                    top: 52px * $size;
                    left: 62px * $size;
                }
            }
        }
    }

    @keyframes lds-default {
        0%, 20%, 80%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.5);
        }
    }
</style>
