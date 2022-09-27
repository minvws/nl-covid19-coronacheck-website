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
        openDialog (locale) {
            const showDialog = this.$route.name !== 'Home'
            const confirmAction = this.select
            if (showDialog) {
                const { head, body, yes, no } = this.$t('components.languagePicker.modal', locale)
                this.$store.commit('modal/set', {
                    messageHead: head,
                    messageBody: body,
                    confirmYes: yes,
                    confirmNo: no,
                    confirm: true,
                    closeButton: false,
                    confirmAlert: true,
                    confirmAction
                })
            } else confirmAction()
        },
        select() {
            const locale = this.language.locale;
            this.$store.commit('languages/setCurrent', this.language);
            this.$i18n.locale = locale;
            const html = document.documentElement;
            html.setAttribute('lang', locale);
            this.$emit('close');
        }
    }
}
</script>

<template>
    <li
        class="language-picker__language">
        <span v-if="isCurrent">
            {{language.name}} ({{$t('components.languagePicker.currentLanguage')}})
        </span>
        <button
            v-else
            @click="openDialog(language.locale)"
            class="language-picker__link"
            :hreflang="language.locale"
            :lang="language.locale"
            type="button">
            {{language.name}}
        </button>
    </li>
</template>
