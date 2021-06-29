<script>
import LanguagePicker from './language/LanguagePicker';
import Skiplinks from './Skiplinks';

export default {
    name: 'Identity',
    components: { Skiplinks, LanguagePicker },
    computed: {
        hasLanguages() {
            return this.$store.state.languages.all.length > 1;
        },
        pageHeaderImage() {
            if (this.$route.meta.pageHeader) {
                if (this.$route.meta.pageHeader === 'error') {
                    return 'assets/img/artwork/coronacheck-header-error.svg';
                } else {
                    return 'assets/img/artwork/coronacheck-header-regular.svg'
                }
            } else {
                // standard
                return 'assets/img/artwork/coronacheck-header-regular.svg'
            }
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
            <img
                :alt="$t('logo-government')"
                width="45"
                src="assets/img/rijksoverheid/label_ministerie.svg"/>
        </div>

        <div class="pagewrap">
            <div class="Identity__image-container">
                <img
                    class="Identity__image"
                    alt=""
                    width="246"
                    height="150"
                    :src="pageHeaderImage"/>
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
            overflow: hidden;

            .Identity__image {
                display: block;
                height: auto;
                margin-left: 60px;
                max-width: 343px;
                width: 100%;
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
        top: 38px;
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
