import i18n from '@/i18n'

export const goHome = () => {
    // force a reload of the home page
    window.location.href = `/${i18n.locale}/`;
}
