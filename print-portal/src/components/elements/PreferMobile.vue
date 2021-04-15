<script>
export default {
    name: 'PreferMobile',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="PreferMobile">
        <div class="PreferMobile__image">
            <img
                alt="Liever je testbewijs op je mobiel?"
                src="assets/img/artwork/mobile-phone-using-coronacheck.png"/>
        </div>
        <div class="PreferMobile__text">
            <h3>
                {{translate('preferMobile')}}
            </h3>
            <p>
                {{translate('preferMobileDirection')}}
            </p>
            <div class="PreferMobile__badges">
                <a
                    class="app-badge"
                    href="https://apps.apple.com/nl/app/coronacheck/id1548269870"
                    target="_blank">
                    <img src="assets/img/app-store-badges/apple-store-badge.svg"/>
                </a>
                <a
                    class="app-badge app-badge--with-padding"
                    href="https://play.google.com/store/apps/details?id=nl.rijksoverheid.ctr.holder"
                    target="_blank">
                    <img src="assets/img/app-store-badges/google-play-badge.png"/>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.PreferMobile {
    background: $background-color-1;
    margin-top: $length-xxl;
    padding: $length-xxl 108px 0 108px;
    display: flex;
    height: 350px;
    overflow: hidden;
    margin-bottom: $length-xxl;

    .PreferMobile__image {
        width: 250px;
        margin-right: 60px;
        padding: 0 12px;

        img {
            width: 100%;
        }
    }

    .PreferMobile__text {
        width: calc(100% - 310px);
    }

    .PreferMobile__badges {
        display: flex;
        margin-left: -10px;

        .app-badge {
            height: 60px;
            padding: 10px;
            margin-right: 20px;
            display: block;

            &.app-badge--with-padding {
                height: 60px;
                padding: 0;
            }

            &:last-child {
                margin-right: 0;
            }

            img {
                height: 100%;
            }
        }
    }

    @include tablet() {
        padding: 70px 12px 0 12px;
        flex-direction: column-reverse;

        .PreferMobile__image {
            width: 100%;

            img {
                width: 100%;
            }
        }

        .PreferMobile__text {
            width: 100%;
        }
    }

    @include mobile() {
        padding: $length-xl $length-s 0 $length-s;
        height: auto;
        margin-bottom: $length-xxl--mobile;

        .PreferMobile__image {
            width: 100%;
            margin-right: 0;
            height: 260px;
            overflow: hidden;
            padding: 0 $length-xl--mobile;
        }

        .PreferMobile__text {
            width: 100%;
            margin-bottom: 56px;

            .PreferMobile__badges {
                display: block;

                // ugly bottom margin. The android images have 10px padding inside the image
                // to be consequent, we do this for apple as well with padding.
                // 10 + 10 = 20 -> -4px to reach the designed 16 (...)
                .app-badge {
                    margin: 0 0 -4px 0;
                }
            }
        }
    }
}
</style>
