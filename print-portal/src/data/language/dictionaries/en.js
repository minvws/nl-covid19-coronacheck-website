import footer from '../templates/en/footer';
import json from './en.json'

export default {
    ...json,
    xss: '{0}', // #TAIGA-4693: let i18n parse the untrusted content safely
    'template': { footer }
}
