import { UserManager } from 'oidc-client';

const getNonce = () => {
    return Math.random().toString(36).substring(7);
}

const getClientSettings = () => {
    return {
        // userStore: new Oidc.WebStorageStateStore(),
        authority: 'https://tvs-connect.acc.coronacheck.nl',
        client_id: 'test_client',
        scope: 'openid',
        response_type: 'code',
        redirect_uri: window.location.origin + '/nl/print/jouw-vaccinaties-redirect',
        extraQueryParams: {
            nonce: getNonce()
        },
        filterProtocolClaims: true,
        loadUserInfo: false
    };
}
//
// const optionsTest = {
//     userStore: new Oidc.WebStorageStateStore(),
//     authority: 'https://dev-51odbhlm.eu.auth0.com',
//     client_id: '3GPG1OoyjiI94HT2uRszIaBK9041LtAt',
//     scope: 'openid',
//     response_type: 'code',
//     extraQueryParams: {
//         nonce: Math.random().toString(36).substring(7)
//     }
// }

export default class AuthService {
    manager = new UserManager(getClientSettings());
    user = null;

    constructor() {
        this.manager.getUser().then(user => {
            this.user = user;
        });
    }

    startAuthentication() {
        return this.manager.signinRedirect();
    }

    completeAuthentication() {
        return this.manager.signinRedirectCallback().then(user => {
            console.log(user);
            this.user = user;
        }).catch((error) => {
            console.log(error);
        })
    }
}
