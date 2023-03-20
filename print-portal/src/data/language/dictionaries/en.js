import footer from '../templates/en/footer';
import json from './en.json'
import country from './en-country-codes.json'
export default {
    ...json,
    country,
    'template': { footer }
}
