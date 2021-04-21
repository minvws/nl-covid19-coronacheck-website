<script>
import LanguagePicker from './language/LanguagePicker';

export default {
    name: 'Identity',
    components: { LanguagePicker },
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
        <a
            href="https://coronacheck.nl/"
            class="logo-nederland">
            <img
                alt="Label Rijksoverheid"
                width="45"
                src="assets/img/rijksoverheid/label_ministerie.svg"/>
        </a>
        <div class="pagewrap">
            <img
                class="Identity__image"
                alt="Holder QR maken"
                width="356"
                src="assets/img/artwork/holder_qrcode_maken.svg"/>
        </div>
        <a
            href="https://coronacheck.nl/nl/"
            class="CoronaCheck-logo">
            CoronaCheck
        </a>
        <div class="Identity__tools">
            <a
                href="https://coronacheck.nl/nl/faq"
                class="Identity__faq">
                {{translate('faq')}}
            </a>
            <LanguagePicker
                v-if="hasLanguages"/>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Identity {
    background: $background-color-1;
    position: relative;
    height: 250px;
    display: flex;
    align-items: flex-end;

    .logo-nederland {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

    .Identity__image {
        display: block;
        height: auto;
        margin-left: 60px;
    }

    .CoronaCheck-logo {
        position: absolute;
        left: 20px;
        top: 27px;
        color: $color-overheid-1;
        font-weight: 700;
        font-size: 20px;
        text-decoration: none;
        padding: 4px;

        &:hover {
            text-decoration: underline;
        }
    }

    .Identity__tools {
        position: absolute;
        right: 30px;
        top: 30px;
        display: flex;
        align-items: center;

        .Identity__faq {
            color: $color-overheid-1;
            font-weight: 700;
            font-size: 20px;
            text-decoration: none;
            margin-right: 24px;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    @include mobile() {
        justify-content: center;

        .pagewrap {
            padding: 0;
        }

        .Identity__image {
            margin: 0 auto;
            height: 150px;
        }

        .Identity__tools {

            .Identity__faq {
                display: none;
            }
        }
    }
}

.direction-rtl {

    .Identity {

        .Identity__tools {

            .Identity__faq {
                margin: 0 0 0 24px;
            }
        }
    }
}
</style>
