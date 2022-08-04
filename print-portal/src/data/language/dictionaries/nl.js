import footer from '../templates/nl/footer';
import json from './nl.json'

export default {
    ...json,
    xss: '{0}', // #TAIGA-4693: let i18n parse the untrusted content safely
    'template': { footer }
}
