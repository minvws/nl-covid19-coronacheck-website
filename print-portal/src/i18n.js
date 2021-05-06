import Vue from 'vue'
import VueI18n from 'vue-i18n'
import dictionary from '@/data/language/dictionary';

Vue.use(VueI18n)

export default new VueI18n({
    locale: 'nl',
    fallbackLocale: 'nl',
    messages: dictionary
})
