<script>
import Language from '@/classes/Language';

export default {
    name: 'LanguagePicerkLanguage',
    components: { },
    props: {
        language: {
            type: Language,
            required: true
        }
    },
    computed: {
        isCurrent() {
            return this.$store.state.languages.current === this.language;
        }
    },
    methods: {
        select() {
            this.$store.commit('languages/setCurrent', this.language);
            this.$parent.$parent.close();
        }
    }
}
</script>

<template>
    <li
        class="language-picker__language">
        <span v-if="isCurrent">
            {{language.name}} ({{$t('currentLanguage')}})
        </span>
        <button
            v-else
            @click="select()"
            class="language-picker__link"
            hreflang="language.locale"
            :lang="language.locale"
            type="button">
            {{language.name}}
        </button>
    </li>
</template>
