import i18n from '@/i18n'
import { TranslateResult } from 'vue-i18n'

const translate = (key: string, props?: Record<string, unknown>) => {
    const translation = i18n.t(key, props)
    return translation !== key ? translation : null
}
export const getPageHeaderIntro = (name: string, props?: Record<string, unknown>) => {
    const keys = [
        ['head', `views.${name}.pageHeader`],
        ['intro', `views.${name}.pageIntro`]

    ]
    return keys.reduce((cul, [key, value]) => {
        const t = translate(value, props)
        if (t && value !== t) cul[key] = t
        return cul
    }, {} as Record<string, TranslateResult>)
}

export const getPageHeaderBody = (name: string, props?: Record<string, unknown>) => {
    return translate(`views.${name}.body`, props);
}

export const getPageLink = (name: string, props?: Record<string, unknown>) => {
    return translate(`views.${name}.link`, props);
}

export const getPageButton = (name: string, props?: Record<string, unknown>) => {
    return translate(`views.${name}.button`, props);
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
