import { UserManager } from 'oidc-client';
// import store from '@/store'

const getNonce = (l) => {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._'
    let length = l;
    let result = '';

    while (length > 0) {
        const bytes = new Uint8Array(16);
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

const getClientSettings = () => {
    return {
        authority: 'https://tvs-connect.acc.coronacheck.nl',
        client_id: 'test_client',
        scope: 'openid',
        response_type: 'code',
        redirect_uri: window.location.origin + '/nl/print/jouw-vaccinaties-redirect',
        extraQueryParams: {
            nonce: getNonce(32)
        },
        filterProtocolClaims: true,
        loadUserInfo: false
    };
}

export default class AuthService {
    manager = new UserManager(getClientSettings());

    startAuthentication() {
        return this.manager.signinRedirect();
    }

    completeAuthentication() {
        return new Promise((resolve, reject) => {
            return this.manager.signinRedirectCallback().then(user => {
                resolve(user);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}
