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
                Liever je testbewijs op je mobiel?
            </h3>
            <p>
                Gebruik de app. Het is ook mogelijk een geprint testbewijs te maken wanneer je een testbewijs hebt
                gemaakt in de app.
            </p>
            <div class="PreferMobile__badges">
                <a
                    class="app-badge"
                    href=""
                    target="">
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
    margin-top: 110px;
    padding: 70px 120px 0 120px;
    display: flex;
    height: 350px;
    overflow: hidden;
    margin-bottom: 100px;

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
}
</style>
