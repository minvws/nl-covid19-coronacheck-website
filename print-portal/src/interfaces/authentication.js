import { UserManager } from 'oidc-client';
import getRandomValues from 'polyfill-crypto.getrandomvalues'
import i18n from './../i18n'

const getNonce = (l) => {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._'
    let length = l;
    let result = '';

    while (length > 0) {
        const bytes = new Uint8Array(16);
        if (!window.crypto) window.crypto = { getRandomValues }
        const random = window.crypto.getRandomValues(bytes);
        random.forEach(function(c) {
            if (length === 0) {
                return;
            }
            if (c < charset.length) {
                result += charset[c];
                length--;
            }
        });
    }
    return result;
}

const getClientSettings = ({ authority, redirect, path, baseUrl }) => {
    const { locale: lang } = i18n;
    const redirect_uri = `${baseUrl}/${lang}/${path}/${redirect}`
    return {
        authority,
        client_id: 'cc_web',
        scope: 'openid',
        response_type: 'code',
        redirect_uri,
        extraQueryParams: {
            nonce: getNonce(32),
            lang
        },
        filterProtocolClaims: true,
        loadUserInfo: false,
        clockSkew: 24 * 60 * 60
    };
}

export default class Authentication {
    manager = null;
    baseUrl = null;
    path = null;
    redirect = null;
    authority = null;

    constructor(baseUrl, path, redirect, authority) {
        this.baseUrl = baseUrl
        this.path = path;
        this.redirect = redirect;
        this.authority = authority;
    }

    getManager() {
        if (!this.manager) {
            this.manager = new UserManager(getClientSettings(this))
        }
        return this.manager;
    }

    startAuthentication() {
        return new Promise((resolve, reject) => {
            this.getManager().signinRedirect().then((result) => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        })
    }

    completeAuthentication() {
        return new Promise((resolve, reject) => {
            return this.getManager().signinRedirectCallback().then(user => {
                resolve(user);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}

// oidc-client-js seems to mutate the original error and only offers a string
// with error.name (error.status), so 'Bad request (400)' as the error message
// we are therefore trying to match with the string 'bad request'
// const is400error = (error) => {
//     return error.message.toLowerCase().indexOf('bad request') > -1;
// }
