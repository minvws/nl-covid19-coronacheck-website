<script>
import LanguagePicerkLanguage from './LanguagePicerkLanguage';

export default {
    name: 'LanguagePickerLanguages',
    components: { LanguagePicerkLanguage },

    computed: {
        languages() {
            return this.$store.state.languages.all;
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>

<template>
    <div
        id="language-dropdown"
        class="language-picker__dropdown">
        <span class="language-picker__title">
            {{$t('changeLanguage')}}:
        </span>
        <ul class="language-picker__languages">
            <LanguagePicerkLanguage
                v-for="(language, index) in languages"
                @close="close"
                :key="index"
                :language="language"/>
        </ul>
    </div>
</template>
