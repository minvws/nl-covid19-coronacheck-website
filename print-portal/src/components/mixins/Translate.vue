<script>
import dictionary from '@/data/dictionary';

export default {
    name: 'Translate',
    components: {},
    computed: {
        currentLanguage() {
            return this.$store.state.languages.current;
        }
    },
    methods: {
        translate(word, capitalize = true) {
            let translation;
            const language = this.$store.state.languages.current;
            const locale = language ? language.locale : 'nl';
            if (dictionary[word] && dictionary[word][locale]) {
                translation = dictionary[word][locale];
                return capitalize ? translation : translation.toLowerCase();
            } else {
                return 'Could not translate ' + word;
            }
        }
    }
}
</script>
