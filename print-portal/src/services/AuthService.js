import { UserManager } from 'oidc-client';

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

const getClientSettings = (redirect_uri) => {
    return {
        authority: 'https://tvs.acc.coronacheck.nl',
        client_id: 'test_client',
        scope: 'openid',
        response_type: 'code',
        redirect_uri: redirect_uri,
        extraQueryParams: {
            nonce: getNonce(32)
        },
        filterProtocolClaims: true,
        loadUserInfo: false
    };
}

export default class AuthService {
    manager = null;

    constructor(redirect_uri) {
        this.manager = new UserManager(getClientSettings(redirect_uri))
    }

    startAuthentication() {
        this.manager.signinRedirect();
    }

    completeAuthentication() {
        return new Promise((resolve, reject) => {
            return this.manager.signinRedirectCallback().then(user => {
                resolve(user);
            }, (error) => {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 400) {
                        reject(error)
                    }
                }
            })
        })
    }
}
