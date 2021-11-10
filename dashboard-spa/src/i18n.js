import { derived, readable } from 'svelte/store';
import translations from './translations.json';

export const locale = readable(document.documentElement.lang) || "nl";

export const t = derived(
    locale,
    ($locale) => (segment) =>
        translations[segment]
            ? translations[segment][$locale] || translations[segment].nl
            : segment
);
