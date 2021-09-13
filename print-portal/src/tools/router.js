import store from '@/store';

export const goHome = () => {
    const locale = store.state.languages.current ? store.state.languages.current.locale : '';
    // this address is outside of the vue application, therefor not testable in local host env
    window.location.href = window.location.origin + '/' + locale + '/';
}
