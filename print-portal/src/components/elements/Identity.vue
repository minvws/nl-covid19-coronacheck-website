<script>
import LanguagePicker from './language/LanguagePicker';
import Skiplinks from './Skiplinks';

export default {
    name: 'Identity',
    components: { Skiplinks, LanguagePicker },
    computed: {
        hasLanguages() {
            return this.$store.state.languages.all.length > 1;
        }
    },
    methods: {
        // todo faq href for multi language
    }
}
</script>

<template>
    <div class="Identity">
        <Skiplinks/>

        <div class="logo">
            <a href="https://coronacheck.nl/">
                <img
                    alt="Label Rijksoverheid"
                    width="45"
                    src="assets/img/rijksoverheid/label_ministerie.svg"/>
            </a>
        </div>

        <div class="pagewrap">
            <div class="Identity__image-container">
                <img
                    class="Identity__image"
                    alt="Holder QR maken"
                    width="356"
                    src="assets/img/artwork/holder_qrcode_maken.svg"/>
            </div>

        </div>
        <a
            href="https://coronacheck.nl/nl/"
            class="CoronaCheck-logo">
            CoronaCheck
        </a>
        <a
            href="https://coronacheck.nl/nl/faq"
            class="header__layout__faq-link">
            {{$t('faq')}}
        </a>
        <LanguagePicker
            v-if="hasLanguages"/>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Identity {
    background: $color-RO_lightblue;
    position: relative;
    height: 250px;

    .pagewrap {
        height: 100%;

        .Identity__image-container {
            display: flex;
            align-items: flex-end;
            height: 100%;

            .Identity__image {
                display: block;
                height: auto;
                margin-left: 60px;
            }
        }
    }

    .logo {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

    .CoronaCheck-logo {
        position: absolute;
        left: 20px;
        top: 27px;
        color: $color-RO_darkblue;
        font-weight: 700;
        font-size: 20px;
        text-decoration: none;
        padding: 4px;

        &:hover {
            text-decoration: underline;
        }
    }

    @include mobile() {
        justify-content: center;

        .pagewrap {
            padding: 0;

            .Identity__image-container {

                .Identity__image {
                    margin: 0 auto;
                    height: 150px;
                }
            }
        }

        .CoronaCheck-logo {
            top: 42px;
        }

        .Identity__tools {

            .Identity__faq {
                display: none;
            }
        }
    }
}
</style>
