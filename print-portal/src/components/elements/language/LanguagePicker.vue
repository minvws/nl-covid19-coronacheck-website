<script>
import LanguagePickerLanguages from './LanguagePickerLanguages';
import vClickOutside from 'v-click-outside';

export default {
    name: 'LanguagePicker',
    components: { LanguagePickerLanguages },
    directives: {
        clickOutside: vClickOutside.directive
    },
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
            if (process.env.NODE_ENV !== 'development') {
                if (newValue && oldValue) {
                    const url = `${window.location.origin}/${this.currentLanguage.locale}/print`;
                    window.open(url, '_self', 'noopener,noopener');
                }
            }
        }
    }
}
</script>

<template>
    <div
        v-click-outside="close"
        class="language-picker language-picker--home language-picker--right-orientation">
        <span class="language-picker__current">
            <span class="language-picker__label">
                {{$t('components.languagePicker.language')}}:
            </span>
            <strong>
                {{currentLanguage.name}}
            </strong>
        </span>
        <button
            @click="open()"
            v-on:keyup.esc="close"
            type="button"
            class="language-picker__toggle"
            aria-controls="language-dropdown"
            :aria-expanded="isOpen ? 'true' : 'false'">
            <span class="screen-reader-text">
              {{$t('components.languagePicker.changeLanguage')}}
            </span>
            <span class="language-picker__chevron"></span>
        </button>
        <LanguagePickerLanguages
            @close="close"
            v-if="isOpen"
            />
    </div>
</template>

<style lang="scss">
    // all css via shared css with homepage
</style>
