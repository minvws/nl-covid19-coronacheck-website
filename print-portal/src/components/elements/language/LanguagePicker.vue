<script>
import LanguagePickerLanguages from './LanguagePickerLanguages';

export default {
    name: 'LanguagePicker',
    components: { LanguagePickerLanguages },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        currentLanguage() {
            return this.$store.state.languages.current;
        }
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        }
    },
    watch: {
        currentLanguage: function (newValue, oldValue) {
            if (newValue && oldValue) {
                const route = this.$route;
                const name = this.currentLanguage.locale + '/' + route.meta.key;
                this.$router.push({ name });
            }
        }
    }
}
</script>

<template>
    <div class="LanguagePicker">
        <button
            v-if="currentLanguage"
            @click="open()"
            v-on:keyup.esc="close()"
            type="button"
            aria-controls="language-dropdown"
            :aria-expanded="isOpen"
            class="LanguagePicker__current">
            <div class="LanguagePicker__label">
                {{translate('language')}}:
                <strong>{{currentLanguage.name}}</strong>
            </div>
            <div class="LanguagePicker__chevron"></div>
        </button>
        <LanguagePickerLanguages
            v-if="isOpen"/>
    </div>
</template>

<style lang="scss">
.LanguagePicker {
    position: relative;

    .LanguagePicker__current {
        color: #154273;
        background: #fff;
        cursor: pointer;
        padding: 12px;
        border-radius: 6px;
        display: flex;
        align-items: center;

        .LanguagePicker__label {
            font-size: 16px;
            margin-right: 12px;
        }

        .LanguagePicker__chevron {
            width: 12px;
            position: relative;

            &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                border: solid currentColor;
                border-width: 0 1px 1px 0;
                padding: 3px;
                transform: translate(0, -50%) rotate(45deg);
                color: currentColor;
                transition: transform var(--transition-out);
            }
        }
    }
}

.direction-rtl {

    .LanguagePicker {

        .LanguagePicker__current {

            .LanguagePicker__label {
                margin: 0 0 0 12px;
            }
        }
    }
}
</style>
