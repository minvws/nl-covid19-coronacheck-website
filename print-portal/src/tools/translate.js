import store from '@/store/index';
import dictionary from '@/data/dictionary';

const translate = function(word, capitalize = false) {
    let translation;
    const language = store.state.languages.current;
    const isoCode = language ? language.locale : 'nl';
    if (dictionary[word] && dictionary[word][isoCode]) {
        translation = dictionary[word][isoCode];
        return capitalize ? translation : translation.toLowerCase();
    } else {
        return 'Could not translate ' + word;
    }
};

export default {
    translate
};
