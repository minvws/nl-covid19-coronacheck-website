import footer from '../templates/nl/footer';
import json from './nl.json'
import country from './nl-country-codes.json'

export default {
    ...json,
    country,
    'template': { footer }
}
