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
    }
}
</script>

<template>
    <div class="language-picker language-picker--home language-picker--right-orientation">
        <span class="language-picker__current">
            <span class="language-picker__label">
                {{$t('language')}}:
            </span>
            <strong>
                {{currentLanguage.name}}
            </strong>
        </span>
        <button
            @click="open()"
            v-on:keyup.esc="close()"
            type="button"
            class="language-picker__toggle"
            aria-controls="language-dropdown"
            :aria-expanded="isOpen">
            <span class="screen-reader-text">
              Wissel van taal
            </span>
            <span class="language-picker__chevron"></span>
        </button>
        <LanguagePickerLanguages
            v-if="isOpen"/>
    </div>
</template>

<style lang="scss">
    // all css via shared css with homepage
</style>
