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
        :class="{ 'LanguagePicerkLanguage--current': isCurrent }"
        class="LanguagePicerkLanguage">
        <button
            @click="select()"
            :hreflang="language.locale"
            :lang="language.locale"
            type="button">
            {{language.name}}
            <span v-if="isCurrent">
            ({{$t('currentLanguage')}})
        </span>
        </button>
    </li>
</template>

<style lang="scss">
.LanguagePicerkLanguage {
    margin: 0;

    button {
        font-size: inherit;
        color: #154273;
        white-space: nowrap;
        width: 100%;
        padding: 6px 18px;
        text-align: left;
    }

    &.LanguagePicerkLanguage--current {

        button {
            color: #333;
            font-weight: bold;
        }

    }
}
</style>
