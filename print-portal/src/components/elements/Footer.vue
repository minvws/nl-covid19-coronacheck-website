<script>
// this content is temporarily waiting to share content with homepage
export default {
    name: 'Footer',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="Footer">
        <div class="pagewrap">
            <div class="footer-links">
                <div class="footer-links-col ___desktop-50">
                    <div class="footer-logos-info">
                        De apps CoronaCheck en CoronaCheck Scanner zijn ontwikkeld door het ministerie van Volksgezondheid, Welzijn en Sport. De apps hadden niet tot stand kunnen komen zonder de hulp van tientallen experts, ervaringsdeskundigen en een grote open source community van burgers die heeft meegekeken en getest tijdens de ontwikkeling.</div>
                </div>
                <div class="footer-links-col ___desktop-25">
                    <h3>Over CoronaCheck</h3>
                    <ul>
                        <li>
                            <a href="/nl/privacy">
                                Privacy
                            </a>
                        </li>
                        <li>
                            <a href="/nl/cookies">
                                Cookies

                            </a>
                        </li>
                        <li>
                            <a href="/nl/colofon">
                                Colofon

                            </a>
                        </li>
                        <li>
                            <a href="/nl/toegankelijkheidsverklaring">
                                Toegankelijkheidsverklaring
                            </a>
                        </li>
                        <li>
                            <a href="/nl/kwetsbaarheid-melden">
                                Kwetsbaarheid melden

                            </a>
                        </li>
                        <li>
                            <a href="/nl/pers">
                                Pers
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer-links-col ___desktop-25">
                    <h3>Meer informatie?</h3>
                    <ul>
                        <li><a href="https://rijksoverheid.nl" target="_blank" rel="noopener noreferrer">Kijk op rijksoverheid.nl </a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Footer {
    background: $color-overheid-2;
    padding: $grid-x6 0;
    margin-top: $length-xxl;
    color: #fff;

    .footer-links {
        display: flex;
        font-size: 16px;
        line-height: 1.38em;

        .footer-links-col {
            padding: 0 50px 0 0;

            .footer-logos-info {
                margin-top: 28px;
            }

            h3 {
                color: #fff;
                margin-top: 32px;
                margin-bottom: 10px;
                font-size: 20px;
            }

            ul {
                margin: 0;
                padding: 0;

                li {
                    list-style: none;
                    margin-bottom: 0.4em;
                    padding-left: 20px;

                    a {
                        color: #fff;
                        position: relative;
                        text-decoration: none;

                        &:hover {
                            text-decoration: un;
                        }

                        &:before {
                            content: '';
                            position: absolute;
                            height: 10px;
                            width: 10px;
                            background: url(https://coronacheck.nl/img/chevron-right-white.svg) no-repeat 50% 50%;
                            transition: var(--transition-out);
                            display: inline-block;
                            margin-right: 5px;
                            top: 5px;
                            left: -20px;
                        }
                    }
                }
            }
        }
    }
}
</style>
