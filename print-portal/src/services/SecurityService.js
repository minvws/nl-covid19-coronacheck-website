import Oidc from 'oidc-client';

// todo redirect uri's should be based on languages locale setting

// const mgr = new Oidc.UserManager({
//     userStore: new Oidc.WebStorageStateStore(),
//     authority: 'https://dev-51odbhlm.eu.auth0.com',
//     client_id: '3GPG1OoyjiI94HT2uRszIaBK9041LtAt',
//     redirect_uri: window.location.origin + '/nl/print/jouw-vaccinaties',
//     response_type: 'id_token token',
//     scope: 'openid profile email phone address',
//     post_logout_redirect_uri: window.location.origin + '/nl/print',
//     silent_redirect_uri: window.location.origin + '/nl/print/jouw-vaccinaties/',
//     accessTokenExpiringNotificationTime: 10,
//     automaticSilentRenew: true,
//     filterProtocolClaims: true,
//     loadUserInfo: true
// })

const mgr = new Oidc.UserManager({
    userStore: new Oidc.WebStorageStateStore(),
    authority: 'https://dev-51odbhlm.eu.auth0.com',
    client_id: '3GPG1OoyjiI94HT2uRszIaBK9041LtAt',
    redirect_uri: window.location.origin + '/nl/print/jouw-vaccinaties',
    response_type: 'code'
})

// const mgr = new Oidc.UserManager({
//     userStore: new Oidc.WebStorageStateStore(),
//     authority: 'https://tvs.acc.coronacheck.nl/',
//     client_id: 'test_client',
//     redirect_uri: window.location.origin + '/nl/print/jouw-vaccinaties',
//     response_type: 'code'
// })

export default class SecurityService {
    signinRedirect() {
        mgr.signinRedirect().catch(function (err) {
            console.log(err)
        })
    }
}
