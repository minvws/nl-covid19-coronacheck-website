<script>
export default {
    name: 'PreferMobile',
    components: { },
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="PreferMobile">
        <div class="PreferMobile__image">
            <img :src="'assets/img/CoronaCheck_app-' + currentLanguage.locale + '.png'" alt="" width="226" height="289" />
        </div>
        <div class="PreferMobile__text">
            <h2>{{$t('components.preferMobile.header')}}</h2>
            <p>
                {{$t('components.preferMobile.intro')}}
            </p>
            <ul class="layout-app-badges">
                <li class="app_badge_column__left">
                    <a
                        class="app-store"
                        href="https://apps.apple.com/nl/app/coronacheck/id1548269870"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img :src="'assets/img/app-store-badges/app-store-badge-' + currentLanguage.locale + '.svg'" :alt="$t('header-appstore')" />
                    </a>
                </li>
                <li class="app_badge_column__right">
                    <a
                        class="play-store"
                        href="https://play.google.com/store/apps/details?id=nl.rijksoverheid.ctr.holder"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img :src="'assets/img/app-store-badges/google-play-badge-' + currentLanguage.locale + '.svg'" :alt="$t('header-googleplaystore')" />
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.PreferMobile {
    background: $color-RO_lightblue;
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
            height: auto;
        }
    }

    .PreferMobile__text {
        width: calc(100% - 310px);
    }

    .app_badge_column__left {
        margin-right: 32px;
    }

    @include mobile() {
        padding: $length-xl $length-s 0 $length-s;
        height: auto;
        margin-bottom: $length-xxl--mobile;
        flex-direction: column-reverse;

        .PreferMobile__image {
            width: 100%;
            margin-right: 0;
            overflow: hidden;
            padding: 0;
            align-items: flex-end;
            justify-content: center;
            display: flex;

            img {
                width: auto;
                height: auto;
                max-height: 260px;
            }
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
