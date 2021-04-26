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
        <div class="logo">
            <a href="https://coronacheck.nl/">
                <img
                    alt="Label Rijksoverheid"
                    width="45"
                    src="assets/img/rijksoverheid/label_ministerie.svg"/>
            </a>
        </div>

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
        <a
            href="https://coronacheck.nl/nl/faq"
            class="Identity__faq">
            {{$t('faq')}}
        </a>
        <LanguagePicker
            v-if="hasLanguages"/>
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

    .Identity__image {
        display: block;
        height: auto;
        margin-left: 60px;
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
        color: $color-overheid-1;
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
</style>
