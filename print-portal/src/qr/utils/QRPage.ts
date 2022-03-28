import i18n from '@/i18n'
import { TranslateResult } from 'vue-i18n'

const translate = (key: string) => {
    const translation = i18n.t(key)
    return translation !== key ? translation : null
}
export const getPageHeaderIntro = (name: string) => {
    const keys = [
        ['head', `views.${name}.pageHeader`],
        ['intro', `views.${name}.pageIntro`]

    ]
    return keys.reduce((cul, [key, value]) => {
        const t = translate(value)
        if (t && value !== t) cul[key] = t
        return cul
    }, {} as Record<string, TranslateResult>)
}

export const getPageLink = (name: string) => {
    return translate(`views.${name}.link`);
}

export const getFAQ = (list: string[]) => {
    return list.map(name => {
        const key = `components.faq.${name}`
        const summary = translate(`${key}.summary`)
        const content = translate(`${key}.content`)
        return {
            name,
            summary,
            content
        }
    })
        .filter((
            {
                summary,
                content
            }
        ) => (summary !== null && content !== null))
}
