<script>
import LanguagePicerkLanguage from './LanguagePicerkLanguage';
import Translate from '../Translate';
import vClickOutside from 'v-click-outside';

export default {
    name: 'LanguagePickerLanguages',
    components: { Translate, LanguagePicerkLanguage },
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
        class="LanguagePickerLanguages">
        <div class="LanguagePickerLanguages__head">
            <Translate :word="'changeLanguage'"/>:
        </div>
        <ul>
            <LanguagePicerkLanguage
                v-for="(language, index) in languages"
                :key="index"
                :language="language"/>
        </ul>
    </div>
</template>

<style lang="scss">
.LanguagePickerLanguages {
    position: absolute;
    background: #fff;
    top: -10px;
    right: -5px;
    opacity: 1;
    // transition: opacity var(--transition-in), transform var(--transition-in);
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    padding: 12px 0;
    min-width: 232px;
    z-index: 1;
    color: #090c0e;

    .LanguagePickerLanguages__head {
        padding: 0 18px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
}
</style>
