<script>
import LanguagePicerkLanguage from './LanguagePicerkLanguage';
import vClickOutside from 'v-click-outside';

export default {
    name: 'LanguagePickerLanguages',
    components: { LanguagePicerkLanguage },
    directives: {
        clickOutside: vClickOutside.directive
    },
    computed: {
        languages() {
            return this.$store.state.languages.all;
        }
    },
    methods: {
        close() {
            this.$parent.close();
        }
    }
}
</script>

<template>
    <div
        v-click-outside="close"
        id="language-dropdown"
        class="language-picker__dropdown">
        <span class="language-picker__title">
            {{$t('changeLanguage')}}:
        </span>
        <ul class="language-picker__languages">
            <LanguagePicerkLanguage
                v-for="(language, index) in languages"
                :key="index"
                :language="language"/>
        </ul>
    </div>
</template>
