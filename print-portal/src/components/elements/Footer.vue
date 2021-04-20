<script>
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
            <div class="Footer__content">
                <div class="Footer__col Footer__intro">
                    De apps CoronaCheck en CoronaCheck Scanner zijn ontwikkeld door het ministerie van Volksgezondheid,
                    Welzijn en Sport. De apps hadden niet tot stand kunnen komen zonder de hulp van tientallen experts,
                    ervaringsdeskundigen en een grote open source community van burgers die heeft meegekeken en getest
                    tijdens de ontwikkeling.
                </div>
                <div class="Footer__col Footer__info">
                    <h3>
                        Heb je vragen over CoronaCheck?<br>
                        Bel
                        <span class="only-desktop">0800-1421</span>
                        <a class="only-mobile" href="tel:08001421">0800-1421</a>
                        (gratis)
                    </h3>
                    <p>
                        <strong>Openingstijden</strong><br>
                        Maandag t/m zondag 08.00 – 20.00 uur
                    </p>
                    <p>
                        <strong>Of stuur een e-mail naar:</strong><br>
                        <a href="mailto:helpdesk@coronacheck.nl" target="_blank">
                            helpdesk@coronacheck.nl
                        </a>
                    </p>
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

    .Footer__content {
        display: flex;
        justify-content: space-between;

        .Footer__col {
            width: calc(50% - #{$length-s});

            h3 {
                color: #fff;
                margin-top: 0;
                margin-bottom: $length-s;
            }

            a {
                color: #fff;
            }
        }
    }

    @include mobile() {

        .Footer__content {
            display: block;

            .Footer__col {
                width: 100%;
                margin-bottom: $length-s;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
