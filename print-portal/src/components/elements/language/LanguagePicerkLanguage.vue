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
        @click="select()"
        :class="{ 'LanguagePicerkLanguage--current': isCurrent }"
        class="LanguagePicerkLanguage">
        {{language.name}}
        <span v-if="isCurrent">
            ({{translate('currentLanguage')}})
        </span>
    </li>
</template>

<style lang="scss">
.LanguagePicerkLanguage {
    color: #154273;
    margin: 0;
    padding: 6px 18px;
    cursor: pointer;
    white-space: nowrap;

    &.LanguagePicerkLanguage--current {
        color: #333;
        font-weight: bold;
    }
}
</style>
