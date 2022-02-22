import store from '@/store';

export const homeLink = () => {
    const locale = store.state.languages.current ? store.state.languages.current.locale : 'nl';
    // this address is outside of the vue application, therefor not testable in local host env
    return window.location.origin + '/' + locale + '/';
}

export const goHome = () => {
    window.location.href = homeLink()
}
