<script>
import LanguagePicker from './language/LanguagePicker';
import Skiplinks from './Skiplinks';
import LogoRijksoverheid from './LogoRijksoverheid';

export default {
    name: 'Identity',
    components: { LogoRijksoverheid, Skiplinks, LanguagePicker },
    computed: {
        isCompact () {
            // show compact header when not on home, see #TAIGA-4102
            return this.$route.name?.toLowerCase() !== 'home';
        },
        hasLanguages() {
            return this.$store.state.languages.all.length > 1;
        },
        pageHeaderImage() {
            if (this.$route.meta.pageHeader) {
                if (this.$route.meta.pageHeader === 'error') {
                    return 'assets/img/artwork/coronacheck-header-error.svg';
                } else {
                    return 'assets/img/artwork/coronacheck-header-regular-v2.svg'
                }
            } else {
                // standard
                return 'assets/img/artwork/coronacheck-header-regular-v2.svg'
            }
        }
    },
    methods: {
        // todo faq href for multi language
    }
}
</script>

<template>
    <header class="Identity" :class="{ compact: isCompact }">
        <Skiplinks/>

        <div class="logo">
            <LogoRijksoverheid />
        </div>

        <div class="pagewrap" v-if="!isCompact">
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
            :href="`/${$store.state.languages.current.locale}/`"
            class="CoronaCheck-logo">
            CoronaCheck
        </a>
        <a
            href="https://coronacheck.nl/nl/faq"
            class="header__quick-link">
            {{$t('faq')}}
        </a>
        <LanguagePicker
            v-if="hasLanguages"/>
    </header>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Identity {
    background: $color-RO_lightblue;
    position: relative;
    height: 250px;

    &.compact {
        height: 120px;
    }

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
                margin-bottom: -54px;
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
        font-weight: 700;
        font-size: 20px;
        text-decoration: none;
        padding: 4px;
        color: $color-cc-link-darker;

        &:hover,
        &:focus {
            color: $color-cc-link-darker--interaction;
            text-decoration: underline;
        }
    }

    @include mobile() {
        justify-content: center;

        .pagewrap {
            padding: 0;

            .Identity__image-container {

                .Identity__image {
                    margin: 0 auto -12% auto;
                    width: 80%;
                    height: auto;
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
