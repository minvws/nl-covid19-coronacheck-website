<script>
export default {
    name: 'Footer',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="footer">
        <div class="pagewrap">
            <div class="footer-inner">
                <div class="footer-links">
                    <div class="footer-links-col ___desktop-50">
                        <div class="footer-logos-info">
                            <h2 class="screen-reader-text">{{$t('footer-colophon')}}</h2>
                            {{$t('footer-about')}}
                        </div>
                    </div>
                    <div class="footer-links-col ___desktop-50">
                        <h3>
                            {{$t('footer-phone')}}<br>
                            {{$t('footer-phone-call')}}
                            <span class="telephone--as-span">0800-1421</span>
                            <a class="telephone--as-anchor" href="tel:08001421">0800-1421</a>
                            {{$t('footer-phone-call-free')}}
                        </h3>
                        <p>
                            <strong>{{$t('footer-phone-opening')}}</strong><br>
                            {{$t('footer-phone-opening-hours')}}
                        </p>
                        <p>
                            <strong>{{$t('footer-phone-mail')}}</strong><br>
                            <a href="mailto:helpdesk@coronacheck.nl" target="_blank">
                                helpdesk@coronacheck.nl
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.footer {
    margin-top: 100px;

    .pagewrap {
        // padding done by footer-innter
        padding: 0;
    }

    .telephone--as-span {
        display: inline;

        @include mobile() {
            display: none;
        }
        @include mobile-landscape-X() {
            display: none;
        }
    }

    .telephone--as-anchor {
        display: none;

        @include mobile() {
            display: inline;
        }
        @include mobile-landscape-X() {
            display: inline;
        }
    }

    @include mobile() {
        margin-top: 64px;
    }

    @include mobile-landscape-X() {
        margin-top: 64px;
    }
}

</style>
